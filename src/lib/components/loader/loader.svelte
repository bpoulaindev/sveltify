<script>
import {Loader2} from "lucide-svelte";
</script>


    <div class="mt-4 relative h-20 w-20">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 class="w-14 h-14 dark:text-gray-200 text-dark-800 animate-spin-3 stroke-1"/>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <Loader2 class="w-10 h-10 dark:text-gray-200 text-dark-800 animate-spin-2 stroke-[1.5px]"/>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <Loader2 class="w-6 h-6 dark:text-gray-200 text-dark-800 animate-spin-1 stroke-2"/>
        </div>
    </div>