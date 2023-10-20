<script lang="ts">
    import {onMount} from "svelte";
    import {slide} from 'svelte/transition'
    import type {Window} from "@types/spotify-web-playback-sdk";
    import type {SpotifyTrack} from "$lib/types/spotify.js";
    import {Play, Pause, Loader2, SkipBack, SkipForward, Shuffle, Heart, Fullscreen, Minimize} from "lucide-svelte";
    import {writable} from "svelte/store";
    import {Progress} from "./progress/index";
    import {Sound} from "$components/player/sound/index";
    import {UserCard} from "$components/user_card/index.js";
    import {fullScreenStore} from "$lib/stores";

    export let accessToken: string;
    let deviceId: string | null = null;
    export let currentTrack: CustomEvent<SpotifyTrack | null>;
    export let classes: string = '';
    let player = writable<Window.Spotify.Player | null>(null);
    let playerState = writable<Window.Spotify.PlaybackState | null>(null)
    let loadingPlayer = writable<boolean>(false)
    let loadingNextSong = writable<boolean>(false)
    const digestNextSong = async (uri: string) => {
        return fetch('/api/spotify/playback/queue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken,
                uri: uri
            })
        }).then(res => res.json()).then(() => {
            return {
                success: true
            }
        }).catch(err => {
            console.error(err)
            return {
                success: false
            }
        })
    }
    const makeDeviceActive = async () => {
        await fetch('/api/spotify/playback/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken,
                deviceId: deviceId
            })
        }).then(res => res.json()).then(() => {
        }).catch(err => {
            console.error(err)
        })
    }
    let likedTracks = writable<{
        [key: string]: boolean
    }>({})
    const fetchLikedStatus = async (trackId: string) => {
        return fetch('/api/spotify/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken,
                trackIds: [trackId]
            })
        }).then(res => res.json()).then((res) => {
            likedTracks.set({
                ...$likedTracks,
                [trackId]: res?.[0] ?? false
            })
            // console.log('track is liked', $likedTracks)
        }).catch(err => {
            console.error(err)
        })
    }
    $: {
        if (currentTrack && currentTrack.detail && $player) {
            if (!$likedTracks?.[currentTrack?.detail.id]) {
                fetchLikedStatus(currentTrack.detail.id)
            }
            $player.getCurrentState().then(async (state) => {
                if (!state) {
                    console.error('User is not playing music through the Web Playback SDK');
                    await makeDeviceActive();
                }
                const success = await digestNextSong(currentTrack.detail.uri)
                if (success) {
                    currentTrack = null;
                    await skipSong('next')
                } else {
                    console.error('failed to add song to queue')
                }
            });
        }
    }

    onMount(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        (window as Window).onSpotifyWebPlaybackSDKReady = () => {
            $player = new (window as Window).Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => {
                    cb(accessToken);
                },
                volume: 0.5,
                enableMediaSession: true
            });
            console.log('mounted player initialized')
            if (!$player) {
                console.error('Player is not defined');
                return;
            }
            $player.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
                deviceId = device_id;
                loadingPlayer.set(true)
                makeDeviceActive().then(() => {
                    loadingPlayer.set(false)
                });
            });
            $player.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
            });
            $player.addListener('initialization_error', ({message}) => {
                console.error('Failed to initialize', message);
            });
            $player.addListener('authentication_error', ({message}) => {
                console.error('Failed to authenticate', message);
            });
            $player.addListener('account_error', ({message}) => {
                console.error('Account error', message);
            });
            $player.addListener('autoplay_failed', () => {
                console.log('Autoplay is not allowed by the browser autoplay rules');
            });
            $player.setName("Sveltify")
            $player.connect().then(async (success) => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            });
            $player.addListener('player_state_changed',
                async ({
                           position,
                           duration,
                           track_window: {current_track},
                           paused,
                           shuffle
                       }) => {
                    if (current_track && !(current_track.id in $likedTracks) && $likedTracks[current_track.id] !== false) {
                        await fetchLikedStatus(current_track.id)
                    }
                    playerState.set({
                        ...playerState,
                        position,
                        duration,
                        paused,
                        shuffle,
                        track_window: {current_track}
                    })
                });
        };
    });
    const play = async () => {
        if (!$playerState) {
            console.error('User is not playing music through the Web Playback SDK');
            loadingPlayer.set(true)
            await makeDeviceActive();
            loadingPlayer.set(false)
        }
        $player.togglePlay().then(() => {
            console.log('Toggled playback!');
        });
    }
    const skipSong = async (direction: 'next' | 'previous') => {
        if (!$player) {
            console.error('Player is not defined');
            return;
        }
        loadingNextSong.set(true);
        if (direction === 'next') {
            await $player.nextTrack().then(() => {
                loadingNextSong.set(false);
            });
        } else {
            await $player.previousTrack().then(() => {
                loadingNextSong.set(false);
            });
        }
    }
    const updatePlayerState = async (newParams?: any) => {
        $player.getCurrentState().then(async (state) => {
            playerState.set({...state, ...newParams})
        });
    }
    const seek = async (event: CustomEvent<number>) => {
        await $player.seek(event.detail)
        await updatePlayerState();
    }
    let loadingShuffle = writable<boolean>(false)
    const shuffle = async (shuffle: boolean) => {
        loadingShuffle.set(true)
        await fetch('/api/spotify/playback/shuffle', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken,
                shuffle: shuffle
            })
        }).then(res => res.json()).then(() => {
            console.log('sucess shuffling the player')
        }).catch(err => {
            console.error(err)
        })
        await updatePlayerState({
            shuffle: shuffle
        });
        loadingShuffle.set(false)
    }
    const setVolume = async (event: number) => {
        await $player.setVolume(event.detail.volume)
        await updatePlayerState();
    }
    let volume = writable<number>(0.5)
    $: {
        if ($player) {
            $player.getVolume().then((volume) => {
                console.log('setting volume', volume)
            });
        }
    }
</script>

<div
        id="portal"
        class="flex w-fit items-center {$fullScreenStore ? '!min-h-[calc(100dvh-96px)] !h-[calc(100dvh-96px)] flex-col p-0 sm:p-4 items-center justify-between dark:bg-zinc-950 bg-zinc-100' : 'h-[212px] px-2 sm:px-4 lg:px-2 py-2 lg:py-0 lg:flex-row flex-col lg:justify-between shadow-xl bg-white dark:bg-zinc-800 lg:h-14'} transition-height duration-300 ease-linear rounded-2xl {classes}">
    {#if $playerState?.track_window?.current_track && !$loadingPlayer}
        <div class="flex items-center mr-0 w-full {$fullScreenStore ? 'justify-center' : 'lg:w-[500px] lg:min-w-[500px] justify-between'}"
             in:slide="{{axis: 'x', duration: 400, delay: 150}}"
             out:slide="{{axis: 'x', duration: 400}}">
            <div class="flex items-center {$fullScreenStore ? 'flex-col h-full' : 'w-full'}">
                <img src={$playerState?.track_window?.current_track?.album?.images[0]?.url}
                     alt="Album cover"
                     class="{$fullScreenStore ? 'w-[calc(100dvw-32px)] flex sm:w-60 sm:h-60' : 'w-12 h-12 lg:w-10 lg:h-10'} transition-all duration-100 ease-linear rounded-lg border-2 border-zinc-200 dark:border-zinc-700"/>
                <div class="flex flex-col {$fullScreenStore ? 'items-center mt-1 xs:mt-4' : 'ml-2'}">
                    <span class="dark:text-white font-semibold tracking-wide {$fullScreenStore ? 'text-2xl sm:text-3xl text-center' : 'text-base lg:text-lg'}">
                        {$playerState?.track_window?.current_track?.name}
                    </span>
                    <div class="flex items-center flex-wrap {$fullScreenStore && 'mt-1 xs:mt-2'}">
                        {#each $playerState?.track_window?.current_track?.artists as artist, index}
                            <a href={artist.external_urls?.spotify ?? artist.href}
                               target="_blank"
                               title="Open Spotify artist"
                               class="group whitespace-break-spaces inline-flex items-center cursor-pointer tracking-tight {$fullScreenStore ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                                {artist.name}
                                {#if index !== $playerState?.track_window?.current_track?.artists.length - 1}
                                    <span class="mr-0.5">,</span>
                                {/if}
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="flex {$fullScreenStore && 'hidden'}">
                <div class="flex flex-col items-center justify-center">
                    <Heart class="{$likedTracks?.[$playerState?.track_window.current_track.id] ? 'h-3.5 w-3.5 fill-green-500 dark:fill-green-300 text-white dark:text-zinc-900' : 'h-3 w-3 text-zinc-950 dark:text-zinc-700'}"/>
                </div>
                <span class="hidden lg:flex mx-4 h-10 w-0.25 rounded-full bg-zinc-200 dark:bg-zinc-700"/>
            </div>
        </div>
    {:else}
        <div class="flex items-center animate-pulse {$fullScreenStore ? 'flex-col h-full' : 'w-full'}">
            <span
                    class="{$fullScreenStore ? 'w-[calc(100dvw-32px)] flex sm:w-60 sm:h-60' : 'w-12 h-12 lg:w-10 lg:h-10'} bg-zinc-300 dark:bg-zinc-700 transition-all duration-100 ease-linear rounded-lg"/>
            <div class="flex flex-col {$fullScreenStore ? 'items-center mt-4' : 'ml-2'}">
                <span class="dark:text-white font-semibold tracking-wide h-1.5 w-40 rounded-full bg-zinc-300 dark:bg-zinc-700 {$fullScreenStore ? 'text-2xl sm:text-3xl text-center' : 'text-base lg:text-lg'}"/>
                <div class="flex items-center flex-wrap h-1 rounded-full w-1/2 bg-zinc-300 dark:bg-zinc-700 mt-2 {$fullScreenStore && 'mt-2'}"/>
            </div>
        </div>
    {/if}
    <div class="flex flex-col-reverse {!$fullScreenStore && 'lg:flex-col'} w-full lg:w-full transition-width ease-linear duration-300">
        <div class="flex w-full items-center justify-between">
            <UserCard bind:accessToken="{accessToken}"/>
            <div class="flex w-full items-center justify-center lg:mt-0 {$fullScreenStore && '-mt-12 xs:-mt-18'}">
                <button on:click={() => shuffle(!$playerState?.shuffle)}
                        class="{$fullScreenStore ? 'mr-4 sm:mr-8' : 'mr-2 sm:mr-4' } p-0.5 group cursor-pointer">
                    <Shuffle
                            class="{$fullScreenStore ? 'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5' : 'w-1.5 h-1.5 sm:w-2 sm:h-2'} group-hover:text-green-600 dark:group-hover:text-green-300 {
                            $playerState?.shuffle ? 'text-green-600 dark:text-green-300' : 'text-zinc-950 dark:text-white'
                        } {$loadingShuffle && 'animate-pulse-3 !text-green-300'}"/>
                </button>
                <button on:click={() => skipSong('previous')} class=" group cursor-pointer">
                    <SkipBack
                            class="{$fullScreenStore ? 'h-4 w-4 sm:w-5 sm:h-5' : 'h-2.5 w-2.5 sm:w-3 sm:h-3'} dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"/>
                </button>
                <button on:click={play}
                        class="text-white {$fullScreenStore ? 'mx-3 sm:mx-6' : 'mx-1.5 sm:mx-2' } cursor-pointer rounded-full group p-0.5 flex items-center justify-center">
                    {#if !$playerState || $playerState?.paused}
                        {#if $loadingPlayer}
                            <Loader2
                                    class="{$fullScreenStore ? 'h-6 w-6 sm:w-7 sm:h-7' : 'h-3 w-3 sm:w-4 sm:h-4'} text-zinc-950 dark:text-white stroke-[2px] animate-spin"/>
                        {:else}
                            <Play class="{$fullScreenStore ? 'h-6 w-6 sm:w-7 sm:h-7' : 'h-3 w-3 sm:w-4 sm:h-4'} pl-0.5 fill-zinc-950 text-zinc-950 dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"/>
                        {/if}
                    {:else}
                        <Pause class="{$fullScreenStore ? 'h-6 w-6 sm:w-7 sm:h-7' : 'h-3 w-3 sm:w-4 sm:h-4'} stroke-0 fill-zinc-950 text-white dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400"/>
                    {/if}
                </button>
                <button on:click={() => skipSong('next')} class="group cursor-pointer">
                    <SkipForward
                            class="{$fullScreenStore ? 'h-4 w-4 sm:w-5 sm:h-5' : 'h-2.5 w-2.5 sm:w-3 sm:h-3'} dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"
                    />
                </button>
                <Sound volume="{$volume}" on:setVolume={setVolume}
                       classes="{$fullScreenStore ? 'ml-4 sm:ml-8' : 'ml-2 sm:ml-4' } p-0.5"/>
            </div>
            <button class="group cursor-pointer" on:click={() => fullScreenStore.set(!$fullScreenStore)}>
                {#if $fullScreenStore}
                    <Minimize class="h-3.5 w-3.5 sm:h-4 sm:w-4 dark:text-white stroke-1 group-hover:text-zinc-300"/>
                {:else}
                    <Fullscreen class="h-3.5 w-3.5 sm:h-4 sm:w-4 dark:text-white stroke-1 group-hover:text-zinc-300"/>
                {/if}
            </button>
        </div>
        <Progress {playerState} on:seek={seek}
                  classes="{$fullScreenStore ? 'mb-8 xs:mb-14 lg:mb-8' : 'mb-1 mt-2 lg:mt-1 lg:mb-0'}"/>
    </div>
</div>