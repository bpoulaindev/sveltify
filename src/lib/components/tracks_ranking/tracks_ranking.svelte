<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {tracksRankingStore} from "$lib/stores";
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import type {SpotifyApiResponse, SpotifyTrack} from "$lib/types/spotify";
    import {
        updateLocalStorageTracksRanking,
    } from "$src/hooks.client";
    import {initializeTracksRanking} from "$src/hooks.client";
    import {Track} from "$components/tracks_ranking/track/index";

    const dispatch = createEventDispatcher();
    export let accessToken;
    export const changeCurrentTrack = (track: SpotifyTrack) => dispatch('play', track.detail)
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
                <Track {index} {track} on:play={changeCurrentTrack}/>
            {/each}
        </div>
    {/if}
</div>