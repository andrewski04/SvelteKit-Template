<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { SignIn } from '@auth/sveltekit/components';
	import { page } from '$app/state';

	let email = '';
	let error = page.url.searchParams.get('error');

	const handleSignIn = async (provider: string) => {
		await signIn(provider, { redirect: true });
	};
</script>

<div class="mx-auto max-w-md p-4">
	<h2 class="mb-4 text-xl font-bold">Sign In</h2>

	{#if error}
		<p class="text-red-500">Error: {error}</p>
	{/if}

	<!-- Sign in with Email -->
	<form on:submit|preventDefault={() => handleSignIn('nodemailer')} class="space-y-4">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={email} required class="w-full border p-2" />
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">
			Sign in with Email
		</button>
	</form>

	<SignIn
		provider="Github"
		signInPage="signin"
		class="mt-4 w-full rounded bg-gray-900 p-2 text-center text-white"
	></SignIn>
	<!-- Sign in with OAuth providers 
	<button
		on:click={() => handleSignIn('google')}
		class="mt-2 w-full rounded bg-red-500 p-2 text-white"
	>
		Sign in with Google
	</button>
    -->
</div>
