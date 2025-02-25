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

	// Function to add a new user
	async function addUser(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const res = await fetch('/api/users', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			await fetchUsers(); // Refresh user list after adding
		} else {
			console.error('Error adding user');
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-900 p-6 text-white">
	<h2 class="mb-4 text-2xl font-semibold">User List</h2>

	<div class="w-full max-w-lg rounded-lg bg-gray-800 p-4 shadow-md">
		<ul class="divide-y divide-gray-700">
			{#each users as user}
				<li class="p-3 transition hover:bg-gray-700">
					<p class="text-lg font-medium">{user.name}</p>
					<p class="text-sm text-gray-400">ID: {user.id}</p>
					<p class="text-sm text-gray-400">
						Created at: {new Date(user.createdAt).toLocaleString()}
					</p>
				</li>
			{/each}
		</ul>
	</div>

	<h2 class="mt-6 mb-4 text-2xl font-semibold">Add User</h2>
	<form
		on:submit={addUser}
		class="flex w-full max-w-lg flex-col gap-3 rounded-lg bg-gray-800 p-4 shadow-md"
	>
		<input
			type="text"
			name="name"
			placeholder="Enter your name"
			required
			class="w-full rounded-md bg-gray-700 p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
		<button
			type="submit"
			class="w-full rounded-md bg-blue-600 p-2 font-medium text-white transition hover:bg-blue-700"
		>
			Add User
		</button>
	</form>
</div>
