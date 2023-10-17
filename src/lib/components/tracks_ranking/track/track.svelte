<script lang="ts">
    import {Tag} from '$components/tag/index';
    import {darkMode} from '$src/hooks.client.ts';
    import {ExternalLink} from 'lucide-svelte';
    import type {SpotifyTrack} from '$lib/types/spotify';
    import {createEventDispatcher} from 'svelte';
    import {writable} from "svelte/store";

    const dispatch = createEventDispatcher();

    export let track: SpotifyTrack;
    export let index: number;
    let animateTrack = writable<boolean>(false)
    const changeCurrentTrack = (track: SpotifyTrack) => {
        animateTrack.set(true)
        dispatch('play', track);
        setTimeout(() => {
            animateTrack.set(false)
        }, 200)
    };
</script>

<div
        tabindex="0"
        role="button"
        on:keypress={(e) => {
		if (e.key === 'Enter') {
			changeCurrentTrack(track);
		}
	}}
        on:click={() => changeCurrentTrack(track)}
        class="flex {$animateTrack && 'blur-sm !bg-zinc-300 dark:!bg-black'} transition-all duration-300  items-center justify-start w-full my-0.5 sm:my-1 py-0.5 sm:py-1 px-1 sm:px-2 rounded-xl cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-800"
>
	<span class="text-lg sm:text-3xl dark:text-white w-4 sm:w-8 min-w-[32px] sm:min-w-8 mr-1">
		#{index + 1}
	</span>
    <img
            src={track.album.images[1].url}
            alt="profile"
            class="rounded-lg w-9 h-9 min-w-9 min-h-9 sm:w-10 sm:h-10 sm:min-h-10 sm:min-w-10 object-cover bg-center border-2 border-zinc-200 dark:border-zinc-700"
    />
    <div class="flex flex-col ml-2 grow justify-between">
        <span
                class="group -mt-0.25 flex items-center w-auto text-sm sm:text-base sm:w-fit font-semibold tracking-wide dark:text-white ease-in duration-100"
        >
            {track.name}
        </span>
        <div class="flex flex-wrap items-center mt-0.5">
            {#if track.artists.length > 0}
                <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {track.artists[0].name}
                </span>
            {/if}
            {#if track.album.release_date}
                <span class="ml-0.5 sm:ml-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    - {track.album.release_date.split('-')[0]}
                </span>
            {/if}
        </div>
        <div class="flex items-center mt-0.5 sm:mt-1">
            {#if track.explicit}
                <Tag classes="mr-1" label="Explicit" color="red"/>
            {/if}
            {#if track.popularity > 50}
                <Tag classes="mr-1" label="Popular" color="green"/>
            {/if}
        </div>
    </div>
</div>

<style>
</style>