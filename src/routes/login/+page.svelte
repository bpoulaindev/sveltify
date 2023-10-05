<script>
    import {onMount} from "svelte";
    import {useSpotifyLogin} from "../../hooks.client.ts";
    import { LayeredLoader } from "$components/loader";
    onMount(() => {
        useSpotifyLogin()
    })
</script>

<div class="w-full h-full flex items-center justify-center">
    <LayeredLoader />
</div>