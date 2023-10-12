<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {tracksRankingStore} from "$lib/stores.js";
    import {ExternalLink} from "lucide-svelte";
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import type {SpotifyApiResponse, SpotifyTrack} from "$lib/types/spotify";
    import {
        updateLocalStorageTracksRanking,
    } from "$src/hooks.client";
    import {Tag} from "$components/tag/index.js";
    import {initializeTracksRanking} from "$src/hooks.client.js";

    const dispatch = createEventDispatcher();
    export let accessToken;
    export const changeCurrentTrack = (track: SpotifyTrack) => {
        console.log('changeCurrentTrack', track)
        // currentTrackStore.set(track)
        dispatch('play', track)
    }
    export let classes: string = ''
    onMount(async () => {
        initializeTracksRanking()
        if ($tracksRankingStore && dayjs().diff(dayjs($tracksRankingStore.timestamp), 'week') < 2) {
            return;
        }
        await fetch('/api/spotify/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken
            })
        }).then(res => res.json()).then((data: SpotifyApiResponse<SpotifyTrack>) => {
            console.log('tracks', data)
            tracksRankingStore.set({...data, timestamp: dayjs().valueOf()})
            updateLocalStorageTracksRanking(data)
        })
    })
</script>
<div class="flex w-full {classes}">
    {#if !$tracksRankingStore?.total || $tracksRankingStore?.total === 0}
        <div class="flex animate-pulse items-center h-20 w-full rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800">
        </div>
    {:else}
        <div class="flex flex-col items-center px-2 py-1 w-full max-h-[500px] overflow-scroll rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 shadow-xl">
            {#each $tracksRankingStore.items as track, index}
                <div class="flex items-center justify-start w-full h-12 my-1 py-1 px-2 rounded-xl cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ease-in-out duration-100">
                    <span class="text-3xl dark:text-white w-8 mr-1">
                        #{index + 1}
                    </span>
                    <img src={track.album.images[1].url} alt="profile"
                         class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center"
                    />
                    <div class="flex flex-col ml-2 grow">
                        <a href={track.external_urls.spotify}
                           target="_blank"
                           title="Open Spotify profile"
                           class="group flex items-center font-semibold tracking-wide dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                            {track.name}
                            <ExternalLink class="h-2 w-2 ml-1"/>
                        </a>
                        <div class="flex items-center mt-1">
                            {#if track.explicit}
                                <Tag classes="mr-1" label="Explicit" color="red"/>
                            {/if}
                        </div>
                    </div>
                    <button class="ml-auto" on:click={() => changeCurrentTrack(track)}>
                        <svg class="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ease-in-out duration-100"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M5 13l4-3V4l12 6-12 6v-6z"/>
                        </svg>
                    </button>
                    {#if track.preview_url && false}
                        <audio id="audioPlayer" controls>
                            <source src="{track.preview_url}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>