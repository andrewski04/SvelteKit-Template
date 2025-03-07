<script>
	import { page } from '$app/state';

	let error = page.url.searchParams.get('error');
</script>

<div class="mx-auto max-w-md p-4">
	<h2 class="mb-4 text-xl font-bold">Check Your Email</h2>
	<p>We've sent you a sign-in link. Click the link in your email to log in.</p>

	{#if error}
		<p class="text-red-500">Error: {error}</p>
	{/if}

	<p class="mt-4 text-sm text-gray-600">
		If you don’t see the email, check your spam folder or try again.
	</p>
</div>
