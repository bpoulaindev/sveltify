<script lang="ts">
    import {ThemeSwitch} from "$components/theme_switch";
    import {page} from '$app/stores';
    import logo from "$assets/logo_nobg.svg";
    import lightLogo from "$assets/logo_nobg_light.svg";
    import {darkMode, initializeTokens} from "$src/hooks.client.js";
    import {UserCircle2} from "lucide-svelte";
    import {onMount} from "svelte";
    import {tokenStore} from "$lib/stores.ts";
    import type {Tokens} from "$lib/types/spotify.js";

    onMount(() => {
        // initializeTokens(tokens);
    });
    const handleLogin = () => {
        if ($tokenStore === null) {
            window.location.href = '/login';
        } else {
            if ($page.url.pathname.startsWith('/home')) {
                return;
            } else {
                window.location.href = '/home';
            }
        }
    }
</script>
<nav class="flex bg-cream dark:bg-slate-950 shadow w-full max-w-full px-2 py-1">
    <div class="flex w-full items-center">
        <a class="flex items-center grow" href="/">
            <img src={$darkMode ? logo : lightLogo} alt="logo" class="w-3.5 h-3.5">
            <span class="text-2xl font-bold text-indigo-600 dark:text-white -ml-0.5">veltify</span>
        </a>
        <button on:click={handleLogin}
                type="button"
                class="w-fit h-fit rounded-full p-0.25 mr-1 shadow-sm hover:bg-indigo-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <UserCircle2 class="text-indigo-600 dark:text-indigo-300 h-3 w-3 stroke-[1.5px]"/>
        </button>
        <ThemeSwitch/>
    </div>
</nav>