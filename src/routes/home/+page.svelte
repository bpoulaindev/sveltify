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

    let currentTrack: SpotifyTrack | null = null;
    const changeCurrentTrack = (track: SpotifyTrack) => {
        currentTrack = track;
    }
    onMount(async () => {
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
</script>

<div class="flex w-full flex-col mt-1">
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
        <div class="flex w-full mt-2 items-center flex-col lg:flex-row">
            <ArtistsRanking bind:accessToken="{$tokenStore.accessToken.token}"
                            classes="w-full lg:mt-0 lg:w-1/2 lg:mr-1"/>
            <TracksRanking
                    bind:accessToken="{$tokenStore.accessToken.token}"
                    classes="w-full mt-2 lg:mt-0 lg:w-1/2 lg:ml-1"
                    on:play={changeCurrentTrack}
            />
        </div>
    {/if}
</div>
