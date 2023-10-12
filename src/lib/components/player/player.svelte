<script lang="ts">
    import {onMount} from "svelte";
    import {slide, fly} from 'svelte/transition'
    import type {Window} from "@types/spotify-web-playback-sdk";
    import type {SpotifyTrack} from "$lib/types/spotify.js";
    import {Play, Pause, Loader2, SkipBack, SkipForward} from "lucide-svelte";
    import {writable} from "svelte/store";

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
            // Ready
            $player.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
                deviceId = device_id;
            });

            // Not Ready
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
            $player.addListener('autoplay_failed', () => {
                console.log('Autoplay is not allowed by the browser autoplay rules');
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
            $player.setName("Sveltify")
            $player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
            $player.connect().then(async (success) => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
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
        if (!$player) {
            console.error('Player is not defined');
            return;
        }
        $player.getCurrentState().then(async (state) => {
            console.log('what is happening', state)
            if (!state || !state.track_window.current_track) {
                console.error('User is not playing music through the Web Playback SDK');
                loadingPlayer.set(true)
                await makeDeviceActive();
                loadingPlayer.set(false)
            }
            $player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
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
</script>

<div class="flex w-fit items-center px-2 h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 transition-all duration-1000 ease-linear {classes}">
    <button on:click={() => skipSong('previous')} class="mr-2 group">
        <SkipBack class="w-4 h-4 dark:text-zinc-200 stroke-[2px] hover:text-zinc-500 dark:group-hover:text-zinc-400"/>
    </button>
    <button on:click={play}
            class="text-white mr-2  rounded-full group bg-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-400 p-1.5 flex items-center justify-center">
        {#if !$playerState || $playerState?.paused}
            {#if $loadingPlayer}
                <Loader2 class="w-4 h-4 text-zinc-950 stroke-[2px] animate-spin"/>
            {:else}
                <Play class="w-4 h-4 pl-0.5 text-zinc-950 stroke-[2.5px]"/>
            {/if}
        {:else}
            <Pause class="w-4 h-4 text-zinc-950 stroke-[2px]"/>
        {/if}
    </button>
    <button on:click={() => skipSong('next')} class="group">
        <SkipForward
                class="w-4 h-4 dark:text-zinc-200 stroke-[2px] hover:text-zinc-500 dark:group-hover:text-zinc-400"
        />
    </button>
    {#if $playerState?.track_window?.current_track && !$loadingPlayer}
        <div class="flex items-center ml-4" in:slide="{{axis: 'x', duration: 400}}"
             out:slide="{{axis: 'x', duration: 400, delay: 150}}">
            <img src={$playerState?.track_window?.current_track?.album?.images[0]?.url}
                 alt="Album cover"
                 class="w-10 h-10 rounded-lg"/>
            <div class="flex flex-col ml-2">
                <span class="dark:text-white font-semibold tracking-wide text-lg">
                    {$playerState?.track_window?.current_track?.name}
                </span>
                <div class="flex items-center">
                    {#each $playerState?.track_window?.current_track?.artists as artist, index}
                        <a href={artist.external_urls?.spotify ?? artist.href}
                           target="_blank"
                           title="Open Spotify profile"
                           class="group flex items-center cursor-pointer tracking-tight text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                            {artist.name}
                            {#if index !== $playerState?.track_window?.current_track?.artists.length - 1}
                                <span class="mr-0.5">,</span>
                            {/if}
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>