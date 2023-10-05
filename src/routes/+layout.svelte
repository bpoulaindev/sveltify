<script>
    import "../app.css";
    import {Navbar} from "$lib/components/navbar";
    import { initializeDarkMode } from '../hooks.client.ts';
    import {onMount} from "svelte";
    onMount(initializeDarkMode);
</script>
<div class="flex flex-col w-[calc(100dvw)] max-w-[calc(100dvw)] h-[calc(100dvh)] bg-cream dark:bg-gray-900 transition-colors ease-linear duration-150">
    <Navbar />
    <div class="flex flex-col w-full px-2 py-1">
        <slot />
    </div>
</div>
