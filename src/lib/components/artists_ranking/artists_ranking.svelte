<script lang="ts">
    import {artistsRankingStore} from "$lib/stores.js";
    import {ExternalLink} from "lucide-svelte";
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import type {SpotifyApiResponse, SpotifyArtist} from "$lib/types/spotify";
    import {
        initializeArtistsRanking,
        updateLocalStorageArtistsRanking,
    } from "$src/hooks.client";
    import {Tag} from "$components/tag/index.js";

    export let accessToken;
    export let classes: string = ''
    onMount(async () => {
        initializeArtistsRanking();
        if ($artistsRankingStore && dayjs().diff(dayjs($artistsRankingStore.timestamp), 'week') < 2) {
            return;
        }
        await fetch('/api/spotify/artists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: accessToken
            })
        }).then(res => res.json()).then((data: SpotifyApiResponse<SpotifyArtist>) => {
            console.log(data)
            artistsRankingStore.set({...data, timestamp: dayjs().valueOf()})
            updateLocalStorageArtistsRanking(data)
        })
    })
</script>
<div class="flex w-full {classes}">
    {#if !$artistsRankingStore?.total || $artistsRankingStore?.total === 0}
        <div class="flex animate-pulse items-center h-20 w-full rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800">
        </div>
    {:else}
        <div class="flex flex-col items-center px-2 py-1 w-full max-h-[500px] overflow-scroll rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 shadow-xl">
            {#each $artistsRankingStore.items as artist, index}
                <div class="flex items-center justify-start w-full h-12 my-1 py-1 px-2 rounded-xl cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ease-in-out duration-100">
                    <span class="text-3xl dark:text-white w-8 min-w-8 mr-1">
                        #{index + 1}
                    </span>
                    <img src={artist.images[1].url} alt="profile"
                         class="rounded-lg w-10 h-10 min-h-10 min-w-[80px] object-cover bg-center"
                    />
                    <div class="flex flex-col ml-2 w-[calc(100%-80px-64px)]">
                        <a href={artist.external_urls.spotify}
                           target="_blank"
                           title="Open Spotify profile"
                           class="group flex items-center font-semibold tracking-wide dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                            {artist.name}
                            <ExternalLink class="h-2 w-2 ml-1"/>
                        </a>
                        <div class="flex items-center mt-1 flex-wrap w-fit">
                            {#each artist.genres as genre}
                                <Tag classes="mr-1 mb-1" label="{genre}"/>
                            {/each}
                            {#if artist.genres.length === 0}
                                <Tag classes="mr-1 mb-1" label="Uncategorized" color="zinc"/>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>