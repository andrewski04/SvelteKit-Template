<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';

	let name = '';
	let email = '';
	let password = '';
	let errorMessage = '';

	async function register(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
		});

		if (!res.ok) {
			errorMessage = 'Failed to register. User may already exist.';
		} else {
			await signIn('credentials', { email, password });
		}
	}

	async function login(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';

		const res = await signIn('credentials', { email, password, redirect: false });

		if (!res?.ok) {
			errorMessage = 'Invalid login credentials';
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-900 p-6 text-white">
	<h2 class="text-2xl font-semibold">Sign In</h2>

	<form on:submit={login} class="mt-6 flex flex-col gap-3 rounded-md bg-gray-800 p-4">
		<input
			type="email"
			bind:value={email}
			placeholder="Email"
			class="rounded-md bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="rounded-md bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500"
			required
		/>

		{#if errorMessage}
			<p class="text-red-500">{errorMessage}</p>
		{/if}

		<button type="submit" class="rounded bg-blue-600 p-2 font-medium text-white hover:bg-blue-700">
			Log In
		</button>
	</form>

	<h2 class="mt-6 text-2xl font-semibold">Register</h2>

	<form on:submit={register} class="mt-6 flex flex-col gap-3 rounded-md bg-gray-800 p-4">
		<input
			type="text"
			bind:value={name}
			placeholder="Name"
			class="rounded-md bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="email"
			bind:value={email}
			placeholder="Email"
			class="rounded-md bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="rounded-md bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500"
			required
		/>

		{#if errorMessage}
			<p class="text-red-500">{errorMessage}</p>
		{/if}

		<button
			type="submit"
			class="rounded bg-green-600 p-2 font-medium text-white hover:bg-green-700"
		>
			Register & Sign In
		</button>
	</form>

	<button
		on:click={() => signOut()}
		class="mt-6 rounded bg-red-500 p-2 font-medium text-white hover:bg-red-600"
	>
		Sign Out
	</button>
</div>
