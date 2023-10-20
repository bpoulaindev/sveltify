<script lang="ts">
    import {ThemeSwitch} from "$components/theme_switch/index.ts";
    import {page} from '$app/stores';
    import logo from "$assets/logo_nobg.svg";
    import lightLogo from "$assets/logo_nobg_light.svg";
    import {darkMode} from "$src/hooks.client.js";
    import {UserCircle2} from "lucide-svelte";
    import {onMount} from "svelte";
    import {tokenStore, fullScreenStore} from "$lib/stores.ts";

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
<nav class="flex rounded-2xl max-w-auto {$fullScreenStore ? 'bg-transparent px-1 sm:px-2 py-1 m-1 sm:m-2' : 'bg-white shadow-xl dark:bg-zinc-800 px-1.5 xs:px-2 py-1 m-1.5 xs:m-2'}">
    <div class="flex w-full items-center">
        <div class="flex grow items-center">
            <a class="flex items-center w-fit" href="/">
                <img src={$darkMode ? logo : lightLogo} alt="logo" class="w-3.5 h-3.5">
                <span class="text-2xl tracking-wider font-bold text-zinc-800 dark:text-white -ml-0.5 font-supreme">veltify</span>
            </a>
        </div>
        <button on:click={handleLogin}
                type="button"
                class="w-fit h-fit rounded-full p-0.5 mr-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            <UserCircle2 class="text-zinc-950 dark:text-zinc-200 stroke-[1.5px] h-3 w-3"/>
        </button>
        <ThemeSwitch/>
    </div>
</nav>