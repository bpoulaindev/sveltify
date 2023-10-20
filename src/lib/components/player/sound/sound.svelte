<script lang="ts">
    import {createPopover, createSlider, melt} from '@melt-ui/svelte';
    import {fade} from 'svelte/transition';
    import {Volume1, Volume2, VolumeX, X} from 'lucide-svelte';
    import {createEventDispatcher} from "svelte";
    import {writable} from "svelte/store";
    import {fullScreenStore} from "$lib/stores.ts";
    import * as lodash from "lodash";

    export let volume: number;
    let screenWidth: number;
    export let classes: string;
    let newVolume = writable<number[]>([volume]);
    const {
        elements: {trigger, content, arrow, close},
        states: {open},
    } = createPopover({
        forceVisible: true,
        positioning: {
            placement: 'top-end',
        },
    });
    const {
        elements: {root, range, thumb},
    } = createSlider({
        defaultValue: [0],
        value: newVolume,
        min: 0,
        max: 1,
        step: 0.01,
    });
    const dispatch = createEventDispatcher();
    const setVolume = async (volume: number) => {
        dispatch('setVolume', {volume})
    }
    const debounceVolumeChange = lodash?.debounce(() => {
        setVolume($newVolume[0]);
    }, 500);
    const volumeClasses = "dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-300"
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<button
        type="button"
        class="{classes} group"
        use:melt={$trigger}
        aria-label="Update dimensions"
>
    {#if $newVolume[0] === 0}
        <VolumeX class="{volumeClasses} {$fullScreenStore ? 'w-3 h-3 sm:h-4 sm:w-4' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'}"/>
    {:else if $newVolume[0] < 0.5}
        <Volume1 class="{volumeClasses} {$fullScreenStore ? 'w-3 h-3 sm:h-4 sm:w-4' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'}"/>
    {:else if $newVolume[0] < 1}
        <Volume2 class="{volumeClasses} {$fullScreenStore ? 'w-3 h-3 sm:h-4 sm:w-4' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'}"/>
    {:else}
        <Volume2 class="{volumeClasses} {$fullScreenStore ? 'w-3 h-3 sm:h-4 sm:w-4' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'}"/>
    {/if}
    <span class="sr-only">Open Popover</span>
</button>

{#if $open}
    <div use:melt={$content} transition:fade={{ duration: 100 }}
         class="relative p-2 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700">
        <div use:melt={$arrow} class="border-t-2 border-l-2 border-zinc-200 dark:border-zinc-700"/>
        <span use:melt={$root}
              role="slider"
              aria-roledescription="slider position"
              aria-valuemax="100"
              aria-valuemin="0"
              tabindex="0"
              aria-valuenow={$newVolume[0]}
              class="relative flex w-20 h-0.5 group cursor-pointer items-center transition-width ease-linear duration-300">
          <span class="block w-full h-0.5 bg-zinc-200 dark:bg-zinc-700 rounded-full">
            <span use:melt={$range}
                  class="h-0.5 bg-zinc-400 dark:bg-zinc-500 rounded-full !min-w-[8px] dark:group-hover:bg-zinc-400"/>
          </span>
          <span
                  tabindex="0"
                  role="slider"
                  aria-roledescription="slider position"
                  aria-valuemax="1"
                  aria-valuemin="0"
                  aria-valuenow={$newVolume[0]}
                  on:dragleave={() => debounceVolumeChange()}
                  on:keyup={(e) => {
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          debounceVolumeChange()
                      }
                  }}
                  on:click={() => debounceVolumeChange()}
                  use:melt={$thumb()}
                  class="block w-1 h-1.5  rounded-full bg-zinc-600 dark:bg-white focus:ring-2 focus:ring-zinc-950/40"
          />
        </span>
        <button class="hidden absolute top-1 right-1" use:melt={$close}>
            <X class="square-2"/>
        </button>
    </div>
{/if}