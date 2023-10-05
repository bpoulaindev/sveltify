<script lang="ts">
    import {onMount} from "svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    export let authorization: boolean | null = null
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
        }).then(res => res.json()).then((data) => {
            if (data?.error) {
                console.log('error', data?.error)
                goto('/login/error')
                return
            }
            localStorage.setItem('access_token', data?.access_token)
            goto('/home')
        })
        // console.log('i wanna cry', test)
        // const { data, error } = await useAccessToken(codeVerifier, code)
            // localStorage.setItem('access_token', data?.access_token)
    })

</script>