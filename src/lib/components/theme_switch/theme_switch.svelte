<script lang="ts">
    import {Moon, SunDim} from "lucide-svelte";
    import {darkMode, toggleDarkMode} from '../../../hooks.client.ts';
</script>
<button
        type="button"
        class={`${$darkMode ? 'bg-zinc-900 ring-zinc-700 hover:bg-zinc-950' : 'bg-zinc-200/80 ring-zinc-300 hover:bg-white'} group relative inline-flex max-h-3.5 h-3.5 w-6.5 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-1 focus:ring-2 dark:focus:ring-zinc-700 focus:ring-zinc-300 focus:ring-offset-0`}
        role="switch"
        aria-checked="false"
        on:click={toggleDarkMode}
>
    <span class="sr-only">Use setting</span>
    <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
    <span class={`${$darkMode ? 'translate-x-3' : 'translate-x-0'} pointer-events-none relative inline-block h-3 w-3 transform rounded-full ring-0 transition duration-200 ease-in-out`}>
    <!-- Enabled: "opacity-0 duration-100 ease-out", Not Enabled: "opacity-100 duration-200 ease-in" -->

        <Moon class={`${$darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-zinc-300 rounded-full p-0.25 bg-zinc-950`}/>
        <SunDim class={`${$darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity text-zinc-600 rounded-full p-0.25 bg-white`}/>
        <!-- Enabled: "opacity-100 duration-200 ease-in", Not Enabled: "opacity-0 duration-100 ease-out" -->

  </span>
</button>