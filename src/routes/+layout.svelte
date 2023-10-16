<script>
    import '../app.css';
    import {Navbar} from '$lib/components/navbar/index';
    import {initializeDarkMode, initializeTokens} from '../hooks.client';
    import {onMount} from 'svelte';

    onMount(() => {
        initializeDarkMode();
        initializeTokens()
    });
</script>

<div
        class="flex flex-col w-[calc(100dvw)] relative z-0 max-w-[calc(100dvw)] min-h-[calc(100dvh)] max-h-[calc(100dvh)] overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors ease-linear duration-150"
>
    <!-- <div class="z-0 h-[350px] w-[500px] sm:h-[450px] sm:w-[750px] bg-red-200/60 dark:bg-red-200/30 rounded-full flex -rotate-45 absolute -left-[300px] sm:-left-[400px] -bottom-1/4 blur-3xl" /> -->
    <Navbar/>
    <div class="flex flex-col w-full px-2 pb-2">
        <slot/>
    </div>
</div>
