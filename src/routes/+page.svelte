<script>
    import {GrainSVG} from "$components/grain_svg";
    import {ArrowRightCircle} from "lucide-svelte";
    import {Planets} from "$components/planets";
</script>
<div class="flex flex-col relative w-full h-[calc(100dvh)] max-h-[calc(100dvh)] items-center justify-start">
    <GrainSVG className="top-3/4"/>
    <Planets/>
    <div class="flex p-2 sm:p-6 max-w-[850px] mx-0 sm:mx-4 md:mx-6 lg:mx-10 w-auto flex-col justify-center items-center bg-white/40 dark:bg-slate-950/30 mt-10 sm:mt-10 rounded-2xl backdrop-blur-sm drop-shadow-lg">
        <h1 class="text-center text-3xl tracking-tight xs:text-4xl sm:text-5xl lg:text-7xl font-semibold text-indigo-600 dark:text-white -ml-1 underline underline-offset-4 decoration-4 decoration-indigo-500/30 dark:decoration-indigo-500/60">
            Harmonize with Sveltify</h1>
        <p class="w-full text-normal xs:text-xl leading-6 sm:leading-8 mt-2 sm:mt-4 text-slate-800 dark:text-slate-400 text-center sm:px-10">
            Discover your Spotify profile and dive into music like never before with our innovative app.
        </p>
        <div class="flex items-center justify-center mt-2 sm:mt-4">
            <a type="button" href="/login" title="Login with Spotify"
               class="ease-in duration-100 rounded-lg bg-indigo-500 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex items-center flex-nowrap">
                Let's do it !
                <ArrowRightCircle class="sm:ml-1 ml-0.5 sm:w-3 w-2 sm:h-3 w-2"/>
            </a>
        </div>
    </div>
</div>