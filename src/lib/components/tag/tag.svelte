<script lang="ts">
    export type TagColor = 'green' | 'indigo' | 'red' | 'zinc' | 'yellow' | 'pink' | 'purple' | 'blue'
    export let color: TagColor | undefined
    export let label: string = 'label'
    export let classes: string = ''
    const colorClasses = {
        green: 'bg-green-50 dark:bg-green-400/10 text-green-700 dark:text-green-400 ring-green-600/10 dark:ring-green-400/20',
        indigo: 'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-400 ring-indigo-600/10 dark:ring-indigo-400/20',
        red: 'bg-red-50 dark:bg-red-400/10 text-red-700 dark:text-red-400 ring-red-600/10 dark:ring-red-400/20',
        zinc: 'bg-slate-50 dark:bg-zinc-400/10 text-zinc-700 dark:text-zinc-400 ring-zinc-600/10 dark:ring-zinc-400/20',
        yellow: 'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 ring-yellow-600/10 dark:ring-yellow-400/20',
        pink: 'bg-pink-50 dark:bg-pink-400/10 text-pink-700 dark:text-pink-400 ring-pink-600/10 dark:ring-pink-400/20',
        purple: 'bg-purple-50 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 ring-purple-600/10 dark:ring-purple-400/20',
        blue: 'bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 ring-blue-600/10 dark:ring-blue-400/20',
    } as { [key in TagColor]: string }
    if (!color) {
        const colorOptions: TagColor[] = ['green', 'indigo', 'red', 'zinc', 'yellow', 'pink', 'purple', 'blue'];
        const randomIndex = Math.floor(Math.random() * colorOptions.length);
        color = colorOptions[randomIndex]
    }
</script>

<span class="inline-flex whitespace-nowrap capitalize items-center rounded-md px-0.75 xs:px-1 py-0.25 xs:py-0.5 text-2xs xs:text-xs font-normal xs:font-medium ring-1 ring-inset dark:ring-2 {colorClasses[color]} {classes}">
    {label}
</span>