<script lang="ts">
    import {onMount} from "svelte";
    import { useUserProfile } from "$lib/stores.js";
    import type {UserProfile} from "$lib/types/spotify.js";
    import { LayeredLoader } from "$components/loader";
    const userProfile = useUserProfile();
    onMount(async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            window.location.href = '/login';
        }
        if ($userProfile) {
            return;
        }
        await fetch('/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken
            })
        }).then(res => res.json()).then((data: UserProfile) => {
            userProfile.set(data)
            console.log(data, $userProfile)
        })
    })
</script>

<div class="flex w-full flex-col mt-1">
    {#if !$userProfile}
        <div class="flex flex-col items-center">
            <LayeredLoader />
        </div>
    {/if}
    {#if $userProfile}
        <div class="flex flex-col items-center">
            <div class="relative flex justify-end w-24 h-24">
                <img src={$userProfile.images[1].url} alt="profile" class="z-20 absolute inset-2 bottom-0 rounded-full w-20 h-20 min-h-20 min-w-20 object-cover bg-center ring-[6px] dark:ring-[8px] ring-cream dark:ring-gray-900"/>
                <span class=" w-24 h-24 rounded-full bg-indigo-300 dark:bg-indigo-100 absolute inset-y-0 z-10"></span>
            </div>
            <h1 class="text-3xl font-bold mt-1 dark:text-indigo-100">{$userProfile.display_name}</h1>
        </div>
    {/if}
</div>
