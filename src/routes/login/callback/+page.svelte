<script lang="ts">
    import {onMount} from "svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
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
        }).then(res => res.json()).then((data: {data: string, error: string}) => {
            if (data?.error) {
                goto('/login/error')
                return;
            }
            localStorage.setItem('access_token', data.data)
            goto('/home')
            return;
        })
    })
</script>