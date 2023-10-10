<script lang="ts">
    export let className = '';
    import {onMount} from "svelte";
    import {darkMode} from "$src/hooks.client.ts";

    let dimensions = {
        width: 0,
        height: 0
    };
    onMount(() => {
        dimensions = {
            width: window.innerWidth * (window.innerWidth > 750 ? 1.5 : 2),
            height: window.innerHeight * (window.innerWidth > 750 ? 1.5 : 2)
        };
    });
    let svgColor = {
        center: '#030616',
        circle: '#36309D',
        background: '#030616'
    };
    darkMode.subscribe((value) => {
        svgColor = value
            ? {
                center: '#030616',
                circle: dimensions.width < 750 ? '#6466E9' : '#36309D',
                background: '#030616'
            }
            : {
                center: '#c7c0c0',
                circle: '#6466E9',
                background: '#FFFAF5'
            };
    });
</script>

<div class="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 ${className}">
    <svg
            class="animate-[spin_30s_linear_infinite] sm:animate-[spin_60s_linear_infinite] rounded-full  dark:blur-none"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 700 700"
            width={dimensions.width}
            height={dimensions.height}
    >
        <defs
        >
            <radialGradient id="gggrain-gradient" r="0.5">
                <stop
                        offset="0%"
                        class="transition-colors ease-linear duration-150"
                        stop-color={svgColor.center}
                />
                <stop
                        offset="50%"
                        class="transition-colors ease-linear duration-150"
                        stop-color={svgColor.circle}
                />
                <stop
                        offset="100%"
                        class="transition-colors ease-linear duration-150"
                        stop-color={svgColor.background}
                />
            </radialGradient>
            <filter
                    id="gggrain-filter"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
            >
                <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.69"
                        numOctaves="2"
                        seed="2"
                        stitchTiles="stitch"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        result="turbulence"
                />
                <feColorMatrix
                        type="saturate"
                        values="0"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        in="turbulence"
                        result="colormatrix"
                />
                <feComponentTransfer
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        in="colormatrix"
                        result="componentTransfer"
                >
                    <feFuncR type="linear" slope="3"/>
                    <feFuncG type="linear" slope="3"/>
                    <feFuncB type="linear" slope="3"/>
                </feComponentTransfer>
                <feColorMatrix
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        in="componentTransfer"
                        result="colormatrix2"
                        type="matrix"
                        values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 23 -15"
                />
            </filter>
        </defs
        >
        <g
        >
            <rect width="100%" height="100%" fill="url(#gggrain-gradient)"/>
            <rect
                    width="100%"
                    height="100%"
                    fill="transparent"
                    filter="url(#gggrain-filter)"
                    opacity="0.71"
                    style="mix-blend-mode: soft-light"
            />
        </g
        >
    </svg
    >
</div>