<script lang="ts">
    import { ThemeSwitch} from "$components/theme_switch";
    import logo from "$assets/logo_nobg.svg";
    import lightLogo from "$assets/logo_nobg_light.svg";
    import { darkMode} from "../../../hooks.client.js";
    import {UserCircle2} from "lucide-svelte";
    const handleLogin = () => {
        localStorage.getItem('access_token');
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';
        } else {
            window.location.href = '/home';
        }
    }
</script>
<nav class="flex bg-transparent shadow w-full max-w-full px-2 py-1">
    <div class="flex w-full items-center">
        <span class="flex items-center grow">
            <img src={$darkMode ? logo : lightLogo} alt="logo" class="w-3.5 h-3.5">
            <span class="text-2xl font-bold text-amber-800 dark:text-gray-100 -ml-0.5">veltify</span>
        </span>
        <button on:click={handleLogin}
                type="button"
                class="w-fit h-fit rounded-full p-0.25 mr-1 shadow-sm hover:bg-amber-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <UserCircle2 class="text-amber-800 dark:text-amber-500 h-3 w-3"/>
        </button>
        <ThemeSwitch />
    </div>
</nav>