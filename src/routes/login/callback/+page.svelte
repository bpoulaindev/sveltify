<script lang="ts">
    import {onMount} from "svelte";
    import {page} from '$app/stores';
    import {goto} from '$app/navigation';
    import dayjs from 'dayjs'
    import {updateLocalStorageTokens} from "$src/hooks.client.ts";
    import {tokenStore} from "$lib/stores.ts";

    interface ResponseTokens {
        accessToken: string | null;
        refreshToken: string | null;
        error: string | null;
    }

    onMount(async () => {
        const code = $page.url.searchParams.get('code');
        const codeVerifier = localStorage.getItem('code_verifier') ?? '';
        await fetch('/login/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                codeVerifier
            })
        }).then(res => res.json()).then((data: ResponseTokens) => {
            if (data?.error) {
                goto('/login/error')
                return;
            }
            const today = dayjs().valueOf()

            const newTokens = {
                accessToken: {
                    token: data.accessToken ?? '',
                    timestamp: today
                },
                refreshToken: {
                    token: data.refreshToken ?? '',
                    timestamp: today
                }
            };
            updateLocalStorageTokens(newTokens)
            tokenStore.set(newTokens)
            goto('/home')
            return;
        })
    })
</script>