<script lang="ts">
    import {userProfileStore} from "$lib/stores.js";
    import {ExternalLink} from "lucide-svelte";
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import type {UserProfile} from "$lib/types/spotify";
    import {initializeUserProfile, updateLocalStorageUserProfile} from "$src/hooks.client";
    import {Tag} from "$components/tag/index";

    export let accessToken;
    onMount(async () => {
        initializeUserProfile();
        if ($userProfileStore && $userProfileStore.timestamp < dayjs().valueOf() - 3600000) {
            return;
        }
        await fetch('/api/spotify/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: accessToken
            })
        }).then(res => res.json()).then((data: UserProfile) => {
            userProfileStore.set({...data, timestamp: dayjs().valueOf()})
            updateLocalStorageUserProfile(data)
        })
    })
</script>

{#if !$userProfileStore?.display_name}
    <div class="flex animate-pulse items-center h-14 w-full sm:w-[400px] rounded-2xl p-2 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700">
        <span class="rounded-lg w-10 h-10 min-h-10 min-w-10 bg-gray-200 dark:bg-zinc-800"/>
        <div class="flex flex-col ml-2 grow">
            <span class="grow h-1 bg-zinc-800 rounded-full"/>
            <span class="grow mt-2 h-1 bg-zinc-800 rounded-full"/>
            <span class="grow mt-2 h-1 bg-zinc-800 rounded-full"/>
        </div>
    </div>
{:else}
    <div class="flex min-w-fit sm:w-fit w-full overflow-hidden items-center px-0 lg:px-2 h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700">
        <img src={$userProfileStore.images[1].url} alt="profile"
             class="rounded-lg w-[108px] h-[108px] lg:w-10 lg:h-10 lg:min-h-10 lg:min-w-10 object-cover bg-center lg:ring-2 lg:ring-zinc-200 dark:ring-zinc-700"/>
        <div class="hidden lg:flex flex-col ml-2 ">
            <a href={$userProfileStore.external_urls.spotify}
               target="_blank"
               title="Open Spotify profile"
               class="group text-2xl flex items-center font-bold dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                {$userProfileStore.display_name}
                <ExternalLink class="h-2 w-2 ml-1"/>
            </a>
            <div class="flex items-center mt-0.5">
                {#if $userProfileStore.product === "premium"}
                    <Tag color="red" label="{$userProfileStore.product}"/>
                {:else}
                    <Tag color="green" label="{$userProfileStore.product}"/>
                {/if}
                <span class="ml-1 inline-flex capitalize items-center rounded-md bg-zinc-50 px-1 py-0.5 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/10 dark:ring-2 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20">
                        {$userProfileStore.country}
                    </span>
            </div>
            <h5 class="text-xs mt-1 font-semibold dark:text-zinc-500">{$userProfileStore.followers.total}
                Followers
            </h5>
        </div>
    </div>
{/if}