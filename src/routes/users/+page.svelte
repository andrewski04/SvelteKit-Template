<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '@prisma/client';

	let users: User[] = [];

	// Fetch users when the component is mounted
	onMount(async () => {
		await fetchUsers();
	});

	async function fetchUsers() {
		const res = await fetch('/api/users');
		users = await res.json();
	}
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-900 p-6 text-white">
	<h2 class="mb-4 text-2xl font-semibold">User List</h2>

	<div class="w-full max-w-lg rounded-lg bg-gray-800 p-4 shadow-md">
		<ul class="divide-y divide-gray-700">
			{#each users as user}
				<li class="p-3 transition hover:bg-gray-700">
					<p class="text-lg font-medium">{user.name}</p>
					<p class="text-lg font-medium">{user.email}</p>
					<p class="text-sm text-gray-400">ID: {user.id}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
