<script lang="ts">
    import type {Window} from "@types/spotify-web-playback-sdk";
    import {debounce} from "lodash";
    import {createSlider, melt} from '@melt-ui/svelte';
    import {writable} from "svelte/store";
    import {createEventDispatcher} from "svelte";

    export let classes: string = "";
    export let playerState = writable<Window.Spotify.PlaybackState | null>(null)
    const updateInterval = 1000;
    const dispatch = createEventDispatcher();
    let progress = writable<number[]>([$playerState ? ($playerState?.position * 100) / $playerState?.duration : 0]);
    $: {
        progress.set([$playerState ? ($playerState?.position * 100) / $playerState?.duration : 0]);
    }
    const debouncePositionChange = debounce(() => {
        const rangePosition = $range?.style?.split('right:')?.[1]?.split('%')?.[0]
        const position = 100 - parseFloat(rangePosition, 10);
        seekPosition(position);
    }, 500);
    const seekPosition = async (position: number) => {
        if ($playerState) {
            const newPosition = ($playerState.duration * position) / 100;
            dispatch('seek', {newPosition})
        }
    }
    setInterval(() => {
        if ($playerState && !$playerState.paused && $progress[0] < 100) {
            progress.set([
                $progress[0] + (updateInterval / ($playerState.duration)) * 100
            ]);
        }
    }, updateInterval);
    const {
        elements: {root, range, thumb},
    } = createSlider({
        disabled: !!$playerState,
        defaultValue: [0],
        value: progress,
        max: 100,
        step: 1,
    });
</script>

<span use:melt={$root}
      role="slider"
      aria-roledescription="slider position"
      aria-valuemax="100"
      aria-valuemin="0"
      tabindex="0"
      aria-valuenow={$progress[0]}
      class="relative flex h-1 w-full group cursor-pointer {classes} items-center">
  <span class="block h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full">
    <span use:melt={$range}
          class="h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full !min-w-[8px] dark:group-hover:bg-zinc-400"/>
  </span>
  <span
          tabindex="0"
          role="slider"
          aria-roledescription="slider position"
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={$progress[0]}
          on:dragleave={() => debouncePositionChange()}
          on:keyup={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  debouncePositionChange()
              }
          }}
          on:click={() => debouncePositionChange()}
          use:melt={$thumb()}
          class="hidden group-hover:block focus:block h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-white focus:ring-2 focus:ring-black/40"
  />
</span>