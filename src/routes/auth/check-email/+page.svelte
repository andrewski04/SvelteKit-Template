<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let error = $state('');
	let loading = $state(false);
	let formSubmitted = $state(false);

	export let data: PageData;
	export let form: ActionData;

	$effect(() => {
		if (form?.error) {
			error = form.error;
		}
	});

	function handleSubmit() {
		loading = true;
		formSubmitted = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			loading = false;
		};
	}
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-2xl font-bold tracking-tight">Check your email</h2>

		<div class="mt-4 text-center text-sm">
			<p>We've sent a magic link to <span class="font-medium">{data.email}</span></p>
			<p class="mt-2">Click the link in your email to sign in</p>
		</div>

		<div class="mt-8 text-center">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-white px-2 text-gray-500">Or enter the verification code</span>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
		<form method="POST" use:enhance={handleSubmit} class="space-y-6">
			<div>
				<label for="otp" class="block text-sm font-medium"> Verification code </label>
				<div class="mt-2">
					<input
						id="otp"
						name="otp"
						type="text"
						inputmode="numeric"
						pattern="[0-9]*"
						autocomplete="one-time-code"
						placeholder="Enter 6-digit code"
						required
						class="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			{#if error}
				<div class="text-sm text-red-500" role="alert">{error}</div>
			{/if}

			{#if form?.success}
				<div class="text-sm text-green-500" role="alert">
					Verification successful! Redirecting...
				</div>
			{/if}

			<div>
				<button
					type="submit"
					disabled={loading}
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
				>
					{#if loading}
						Verifying...
					{:else}
						Verify Code
					{/if}
				</button>
			</div>

			<div class="text-center text-sm text-gray-500">
				<p>
					Didn't receive an email? <a
						href="/auth/login"
						class="font-medium text-indigo-600 hover:text-indigo-500">Try again</a
					>
				</p>
			</div>
		</form>
	</div>
</div>
