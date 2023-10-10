<script lang="ts">
    import {onMount} from "svelte";
    import {tokenStore, useTopArtists, userProfileStore} from "$lib/stores.ts";
    import type {Tokens, UserProfile} from "$lib/types/spotify.js";
    import {LayeredLoader} from "$components/loader";
    import {ExternalLink} from "lucide-svelte";
    import * as dayjs from "dayjs";
    import {initializeTokens, updateLocalStorageTokens, updateLocalStorageUserProfile} from "$src/hooks.client.ts";
    import {initializeUserProfile} from "$src/hooks.client.js";

    const topArtists = useTopArtists();
    onMount(async () => {
        initializeTokens();
        initializeUserProfile();
        if (!$tokenStore || !$tokenStore.accessToken || !$tokenStore.refreshToken) {
            window.location.href = '/login';
        }
        const tokens = $tokenStore;
        if (dayjs().valueOf() - tokens?.refreshToken.timestamp > 3600000) {
            tokens.accessToken.token = await fetch('/api/spotify/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    refreshToken: tokens.refreshToken.token
                })
            }).then(res => res.json()).then((data) => {
                const today = dayjs().valueOf();
                const newTokens = {
                    accessToken: {
                        token: data.accessToken,
                        timestamp: today
                    },
                    refreshToken: {
                        token: data.refreshToken,
                        timestamp: today
                    }
                } as Tokens;
                tokenStore.set(newTokens)
                updateLocalStorageTokens(newTokens)
                return data.accessToken;
            })
        }
        if ($userProfileStore && $userProfileStore.timestamp < dayjs().valueOf() - 3600000) {
            return;
        }
        await fetch('/api/spotify/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: tokens?.accessToken.token
            })
        }).then(res => res.json()).then((data: UserProfile) => {
            userProfileStore.set({...data, timestamp: dayjs().valueOf()})
            updateLocalStorageUserProfile(data)
        })
        await fetch('/api/spotify/artists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                accessToken: tokens?.accessToken.token
            })
        }).then(res => res.json()).then((data) => {
            console.log('pitié pitié', data)
        })
    })
</script>

<div class="flex w-full flex-col mt-1">
    {#if !$userProfileStore}
        <div class="flex flex-col items-center">
            <LayeredLoader/>
        </div>
    {/if}
    {#if $userProfileStore}
        <div class="flex items-center w-full justify-center">
            <div class="flex items-center px-2 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800">
                <img src={$userProfileStore.images[1].url} alt="profile"
                     class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center ring-2 ring-indigo-300 dark:ring-slate-700"/>
                <div class="flex flex-col ml-2">
                    <a href={$userProfileStore.external_urls.spotify}
                       target="_blank"
                       title="Open Spotify profile"
                       class="group text-2xl flex items-center font-bold dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                        {$userProfileStore.display_name}
                        <ExternalLink class="h-2 w-2 ml-1"/>
                    </a>
                    <div class="flex items-center mt-0.5">
                        {#if $userProfileStore.product === "premium"}
                    <span class="inline-flex capitalize items-center rounded-md bg-purple-50 px-1 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/10 dark:ring-2 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20">
                    {$userProfileStore.product}
                    </span>
                        {:else}
                    <span class="inline-flex capitalize items-center rounded-md bg-green-50 px-1 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 dark:ring-2 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20">
                        {$userProfileStore.product}
                    </span>
                        {/if}
                        <span class="ml-1 inline-flex capitalize items-center rounded-md bg-slate-50 px-1 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10 dark:ring-2 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20">
                        {$userProfileStore.country}
                    </span>
                    </div>
                    <h5 class="text-xs mt-1 font-semibold dark:text-slate-500">{$userProfileStore.followers.total}
                        Followers</h5>
                </div>
            </div>

        </div>
    {/if}
</div>
