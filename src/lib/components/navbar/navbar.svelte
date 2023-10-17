<script lang="ts">
    import {ThemeSwitch} from "$components/theme_switch/index.ts";
    import {page} from '$app/stores';
    import logo from "$assets/logo_nobg.svg";
    import lightLogo from "$assets/logo_nobg_light.svg";
    import {darkMode} from "$src/hooks.client.js";
    import {UserCircle2} from "lucide-svelte";
    import {onMount} from "svelte";
    import {tokenStore} from "$lib/stores.ts";

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
<nav class="flex rounded-2xl bg-white border-2 border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 max-w-auto px-2 py-1 m-2">
    <div class="flex w-full items-center">
        <a class="flex items-center grow" href="/">
            <img src={$darkMode ? logo : lightLogo} alt="logo" class="w-3.5 h-3.5">
            <span class="text-2xl font-medium text-green-600 dark:text-white -ml-0.5 font-supreme">veltify</span>
        </a>
        <button on:click={handleLogin}
                type="button"
                class="w-fit h-fit rounded-full p-0.5 mr-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            <UserCircle2 class="text-zinc-950 dark:text-zinc-200 stroke-[1.5px] h-3 w-3"/>
        </button>
        <ThemeSwitch/>
    </div>
</nav>