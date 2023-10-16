<script lang="ts">
    import {onMount} from "svelte";
    import {tokenStore} from "$lib/stores";
    import type {SpotifyTrack, Tokens} from "$lib/types/spotify";
    import {LayeredLoader} from "$components/loader/index";
    import {UserCard} from "$components/user_card/index"
    import dayjs from "dayjs";
    import {
        initializeTokens,
        updateLocalStorageTokens
    } from "$src/hooks.client";
    import {ArtistsRanking} from "$components/artists_ranking/index";
    import {TracksRanking} from "$components/tracks_ranking/index";
    import {Player} from "$components/player/index";
    import {writable} from "svelte/store";

    let currentTrack: SpotifyTrack | null = null;
    const changeCurrentTrack = (track: SpotifyTrack) => {
        currentTrack = track;
    }
    let screenWidth
    onMount(async () => {
        // isMobile.set(window.innerWidth < 1024);
        // console.log('isMobile', isMobile)
        initializeTokens();
        if (!$tokenStore || !$tokenStore.accessToken || !$tokenStore.refreshToken) {
            window.location.href = '/login';
        }
        const tokens = $tokenStore;
        console.log('difference', dayjs().diff(dayjs(tokens?.refreshToken?.timestamp), 'minutes'))
        if (dayjs().diff(dayjs(tokens?.refreshToken?.timestamp), 'minutes') > 59) {
            const newAccessToken = await fetch('/api/spotify/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    refreshToken: tokens?.refreshToken?.token || ''
                })
            }).then(res => res.json()).then((data) => {
                const today = dayjs().valueOf();
                const newTokens: Tokens = {
                    accessToken: {
                        token: data.accessToken,
                        timestamp: today
                    },
                    refreshToken: {
                        token: data.refreshToken,
                        timestamp: today
                    }
                };
                tokenStore.set(newTokens)
                updateLocalStorageTokens(newTokens)
                return data.accessToken;
            })
            tokens && tokens.accessToken && tokens.accessToken.token && (tokens.accessToken.token = newAccessToken);
        }
    })
    const activeTab = writable<'artists' | 'tracks'>('artists');
    console.log('screenWidth', screenWidth)
</script>

<svelte:window bind:innerWidth={screenWidth}/>

<div class="flex w-full h-full grow flex-col">
    {#if !$tokenStore?.accessToken?.token || dayjs().diff(dayjs($tokenStore?.refreshToken?.timestamp), 'hour') > 1}
        <div class="flex flex-col items-center">
            <LayeredLoader/>
        </div>
    {:else}
        <div class="flex items-center w-full flex-col sm:flex-row">
            <UserCard bind:accessToken="{$tokenStore.accessToken.token}"/>
            <Player bind:accessToken="{$tokenStore.accessToken.token}" bind:currentTrack={currentTrack}
                    classes="mt-2 sm:mt-0 sm:ml-2 w-full"/>
        </div>
        <nav class="isolate flex lg:hidden w-full divide-x-2 divide-gray-200 dark:divide-zinc-700 rounded-2xl shadow-xl mt-2 border-2 border-zinc-200 dark:border-zinc-700"
             aria-label="Tabs">
            <!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
            <button
                    on:click={() => $activeTab = 'artists'}
                    class="{$activeTab === 'artists' ? 'bg-zinc-100 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-900' } dark:text-white rounded-l-xl group relative min-w-0 flex-1 overflow-hidden py-2 px-2 text-center text-base font-medium focus:z-10"
                    aria-current="page">
                <span>Top artists</span>
                <span aria-hidden="true"
                      class="{$activeTab === 'artists' ? 'bg-zinc-300 dark:bg-zinc-400' : 'bg-transparent' } absolute inset-x-2 rounded-full bottom-0.5 h-0.5"></span>
            </button>
            <button
                    on:click={() => $activeTab = 'tracks'}
                    class="{$activeTab === 'tracks' ? 'bg-zinc-100 dark:bg-zinc-700' : 'bg-white dark:bg-zinc-900' } dark:text-white rounded-r-xl group relative min-w-0 flex-1 overflow-hidden py-2 px-2 text-center text-base font-medium focus:z-10">
                <span>Top tracks</span>
                <span aria-hidden="true"
                      class="{$activeTab === 'tracks' ? 'bg-zinc-300 dark:bg-zinc-400' : 'bg-transparent' } absolute inset-x-2 rounded-full bottom-0.5 h-0.5"></span>
            </button>
        </nav>
        <div class="flex w-full mt-2 items-center flex-col lg:flex-row">
            {#if (screenWidth < 1024 && $activeTab === 'artists') || screenWidth >= 1024}
                <ArtistsRanking bind:accessToken="{$tokenStore.accessToken.token}"
                                classes="w-full lg:mt-0 lg:w-1/2 lg:mr-1"/>
            {/if}
            {#if (screenWidth < 1024 && $activeTab === 'tracks') || screenWidth >= 1024}
                <TracksRanking
                        bind:accessToken="{$tokenStore.accessToken.token}"
                        classes="w-full lg:mt-0 lg:w-1/2 lg:ml-1"
                        on:play={changeCurrentTrack}
                />
            {/if}
        </div>
    {/if}
</div>
