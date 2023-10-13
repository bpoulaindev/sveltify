<script lang="ts">
    import {Tag} from '$components/tag/index';
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
        }, 300)
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
        class="flex {$animateTrack && '!bg-red-300'} items-center justify-start w-full h-12 my-1 py-1 px-2 rounded-xl cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ease-in-out duration-100"
>
	<span class="text-3xl dark:text-white w-8 mr-1">
		#{index + 1}
	</span>
    <img
            src={track.album.images[1].url}
            alt="profile"
            class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center border-2 border-zinc-200 dark:border-zinc-700"
    />
    <div class="flex flex-col ml-2 grow">
        <a
                href={track.external_urls.spotify}
                target="_blank"
                title="Open Spotify profile"
                class="group flex items-center w-fit font-semibold tracking-wide dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100"
        >
            {track.name}
            <ExternalLink class="h-2 w-2 ml-1"/>
        </a>
        <div class="flex items-center mt-1">
            {#if track.explicit}
                <Tag classes="mr-1" label="Explicit" color="red"/>
            {/if}
        </div>
    </div>
</div>
