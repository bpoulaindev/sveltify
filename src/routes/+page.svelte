<script>
    import { UserCircle2 } from 'lucide-svelte';
    const handleLogin = () => {
        localStorage.getItem('access_token');
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';
        } else {
            window.location.href = '/home';
        }
    }
</script>
<h1 class="dark:text-white text-gray-800">
    this is the homepage
</h1>