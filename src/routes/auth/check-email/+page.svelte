<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;
</script>

<div class="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
	<h1 class="mb-4 text-2xl font-bold text-gray-800">Check your email</h1>
	<p class="mb-6 text-gray-600">
		We've sent a login link to <strong class="font-medium">{data.email}</strong>
	</p>

	<div class="relative my-6">
		<div class="absolute inset-0 flex items-center">
			<div class="w-full border-t border-gray-300"></div>
		</div>
		<div class="relative flex justify-center text-sm">
			<span class="bg-white px-2 text-gray-500">OR</span>
		</div>
	</div>

	<h2 class="mb-3 text-xl font-semibold text-gray-800">Enter verification code</h2>
	<p class="mb-4 text-gray-600">
		If you're using a different device, open the link on that device to get a verification code,
		then enter it below:
	</p>

	<form method="POST" action="?/verifyOtp" use:enhance>
		<div class="mb-4">
			<label for="otp" class="mb-1 block text-sm font-medium text-gray-700">Verification Code</label
			>
			<input
				type="text"
				id="otp"
				name="otp"
				placeholder="Enter 6-digit code"
				maxlength="6"
				pattern="[0-9]{6}"
				required
				class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
			/>
		</div>

		<div class="mb-4">
			<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				value={data.email}
				readonly
				class="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
			/>
		</div>

		{#if form?.error}
			<div class="mb-4 text-sm text-red-500">{form.error}</div>
		{/if}

		<button
			type="submit"
			class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
		>
			Verify
		</button>
	</form>

	<div class="mt-6 text-center">
		<a href="/auth/login" class="text-sm text-indigo-600 hover:text-indigo-500">Back to login</a>
	</div>
</div>
