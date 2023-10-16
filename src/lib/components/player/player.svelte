<script lang="ts">
    import {onMount} from "svelte";
    import {slide, fly} from 'svelte/transition'
    import type {Window} from "@types/spotify-web-playback-sdk";
    import type {SpotifyTrack} from "$lib/types/spotify.js";
    import {Play, Pause, Loader2, SkipBack, SkipForward} from "lucide-svelte";
    import {writable} from "svelte/store";
    import {Progress} from "./progress/index";

    export let accessToken: string;
    let deviceId: string | null = null;
    export let currentTrack: SpotifyTrack | null = null;
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
    $: {
        if (currentTrack && $player) {
            $player.getCurrentState().then(async (state) => {
                if (!state) {
                    console.error('User is not playing music through the Web Playback SDK');
                    return;
                }
                console.log('sending this track to the queue', currentTrack)
                const success = await digestNextSong(currentTrack.detail.uri)
                console.log('success', success)
                if (success) {
                    console.log('sucessfully added song to queue')
                    await skipSong('next')
                } else {
                    console.error('failed to add song to queue')
                }
            });
        }
    }

    onMount(() => {
        console.log('mounted')
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
                volume: 0.5
            });
            if (!$player) {
                console.error('Player is not defined');
                return;
            }
            $player.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
                deviceId = device_id;
            });
            $player.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
            });
            $player.addListener('initialization_error', ({message}) => {
                console.error(message);
            });
            $player.addListener('authentication_error', ({message}) => {
                console.error(message);
            });
            $player.addListener('account_error', ({message}) => {
                console.error(message);
            });
            $player.setName("Sveltify")
            $player.connect().then(async (success) => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            });
            $player.addListener('player_state_changed',
                ({
                     position,
                     duration,
                     track_window: {current_track},
                     paused
                 }) => {
                    console.log('something moved')
                    console.log('Currently Playing', current_track);
                    console.log('Position in Song', position);
                    console.log('Duration of Song', duration);
                    playerState.set({
                        ...playerState,
                        position,
                        duration,
                        paused,
                        track_window: {current_track}
                    })
                });
        };
    });
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
            console.log('sucess transfering the music')
        }).catch(err => {
            console.error(err)
        })
    }
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
    const updatePlayerState = async () => {
        $player.getCurrentState().then(async (state) => {
            playerState.set(state)
        });
    }
    const seek = async (event: number) => {
        await $player.seek(event.detail.newPosition)
        await updatePlayerState();
    }
</script>

<div class="flex lg:flex-row flex-col w-fit lg:justify-between items-center px-2 sm:px-4 lg:px-2 py-2 lg:py-0 h-[212px] lg:h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 ease-linear {classes}">
    {#if $playerState?.track_window?.current_track && !$loadingPlayer}
        <div class="flex items-center mr-0 lg:mr-4 w-full lg:w-[360px] lg:min-w-[360px] grow">
            <img src={$playerState?.track_window?.current_track?.album?.images[0]?.url}
                 alt="Album cover"
                 class="w-12 h-12 lg:w-10 lg:h-10 rounded-lg border-2 border-zinc-200 dark:border-zinc-700"/>
            <div class="flex flex-col ml-2">
                <span class="dark:text-white font-semibold tracking-wide text-base lg:text-lg">
                    {$playerState?.track_window?.current_track?.name}
                </span>
                <div class="flex items-center flex-wrap">
                    {#each $playerState?.track_window?.current_track?.artists as artist, index}
                        <a href={artist.external_urls?.spotify ?? artist.href}
                           target="_blank"
                           title="Open Spotify profile"
                           class="group whitespace-break-spaces inline-flex items-center cursor-pointer tracking-tight text-sm sm:text-base text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                            {artist.name}
                            {#if index !== $playerState?.track_window?.current_track?.artists.length - 1}
                                <span class="mr-0.5">,</span>
                            {/if}
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <div class="flex w-full h-14 py-2 animate-pulse-3 items-center">
            <span class="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-zinc-800"/>
            <div class="flex flex-col ml-2 grow">
                <span class="bg-zinc-800 h-2 rounded-full w-2/3"/>
                <span class="bg-zinc-800 mt-2 h-1 rounded-full w-1/2"/>
            </div>
        </div>
    {/if}
    <div class="flex flex-col-reverse lg:flex-col w-full lg:w-full">
        <div class="flex w-full items-center justify-center -mt-3 lg:mt-0">
            <button on:click={() => skipSong('previous')} class="mr-2 group cursor-pointer">
                <SkipBack
                        class="w-3 h-3 sm:w-3 sm:h-3 dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"/>
            </button>
            <button on:click={play}
                    class="text-white mr-2 cursor-pointer rounded-full group p-0.5 flex items-center justify-center">
                {#if !$playerState || $playerState?.paused}
                    {#if $loadingPlayer}
                        <Loader2 class="w-3 h-3 sm:w-4 sm:h-4 text-zinc-950 dark:text-white stroke-[2px] animate-spin"/>
                    {:else}
                        <Play class="w-4 h-4 pl-0.5 fill-zinc-950 text-zinc-950 dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"/>
                    {/if}
                {:else}
                    <Pause class="w-4 h-4 stroke-0 fill-zinc-950 text-white dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400"/>
                {/if}
            </button>
            <button on:click={() => skipSong('next')} class="group cursor-pointer">
                <SkipForward
                        class="w-3 h-3 sm:w-3 sm:h-3 dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"
                />
            </button>
        </div>
        <Progress {playerState} on:seek={seek} classes="mb-2 mt-1 lg:mb-0 lg:mt-0"/>
    </div>
</div>