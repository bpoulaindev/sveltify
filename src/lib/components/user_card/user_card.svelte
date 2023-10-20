<script lang="ts">
    import {fullScreenStore, userProfileStore} from "$lib/stores";
    import {ExternalLink, X} from "lucide-svelte";
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import type {UserProfile} from "$lib/types/spotify";
    import {initializeUserProfile, updateLocalStorageUserProfile} from "$src/hooks.client";
    import {Tag} from "$components/tag/index";
    import {createPopover, createAvatar, melt} from '@melt-ui/svelte';
    import {fade} from 'svelte/transition';


    const {
        elements: {trigger, content, arrow, close},
        states: {open},
    } = createPopover({
        forceVisible: true,
        positioning: {
            placement: 'top-end',
        },
        arrowSize: 8
    });
    export let accessToken;
    export let classes;
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
    <span class="{classes} {$fullScreenStore ? 'h-3.5 w-3.5 min-h-3.5 min-w-[28px] sm:min-w-[40px] sm:h-5 sm:w-5 sm:min-h-5' : 'h-3.5 w-3.5 min-h-3.5 min-w-[28px] sm:min-w-[32px] sm:h-4 sm:w-4 sm:min-h-4'} flex rounded-md animate-pulse bg-zinc-300 dark:bg-zinc-700"/>
{:else}
    <button
            type="button"
            class="{classes} flex {$fullScreenStore ? 'h-3.5 w-3.5 min-h-3.5 min-w-[28px] sm:min-w-[40px] sm:h-5 sm:w-5 sm:min-h-5' : 'h-3.5 w-3.5 min-h-3.5 min-w-[28px] sm:min-w-[32px] sm:h-4 sm:w-4 sm:min-h-4'} overflow-hidden items-center justify-center rounded-md bg-zinc-100"
            use:melt={$trigger}
            aria-label="Open Spotify profile card"
    >
        <img
                src="{$userProfileStore.images[0].url}"
                alt="Avatar"
                class="h-full w-full object-cover bg-center"
        />
        <span class="sr-only">Open Popover</span>
    </button>
    {#if $open}
        <div use:melt={$content} transition:fade={{ duration: 100 }}
             class="flex relative items-center shadow-xl px-2 h-14 w-fit rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700">
            <div use:melt={$arrow} class="border-t-2 border-l-2 border-zinc-200 dark:border-zinc-700"/>
            <div class="flex items-center ">
                <img src={$userProfileStore.images[1].url} alt="profile"
                     class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center ring-2 ring-zinc-200 dark:ring-zinc-700"/>
                <div class="flex flex-col ml-2 ">
                    <a href={$userProfileStore.external_urls.spotify}
                       target="_blank"
                       title="Open Spotify profile"
                       class="group text-lg lg:text-2xl flex items-center font-bold dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">
                        {$userProfileStore.display_name}
                        <ExternalLink class="h-2 w-2 ml-1"/>
                    </a>
                    <div class="flex items-center mt-0.5">
                        {#if $userProfileStore.product === "premium"}
                            <Tag color="red" label="{$userProfileStore.product}"/>
                        {:else}
                            <Tag color="green" label="{$userProfileStore.product}"/>
                        {/if}
                        <Tag color="zinc" classes="ml-1" label="{$userProfileStore.country}"/>
                    </div>
                    <h5 class="text-xs mt-1 font-semibold dark:text-zinc-500">{$userProfileStore.followers.total}
                        Followers
                    </h5>
                </div>
            </div>
            <button class="absolute bottom-1 right-1" use:melt={$close}>
                <X class="square-2 dark:text-white"/>
            </button>
        </div>
    {/if}
{/if}