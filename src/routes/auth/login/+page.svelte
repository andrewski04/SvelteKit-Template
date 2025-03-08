<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<div class="mx-auto max-w-md p-4">
	<h2 class="mb-4 text-xl font-bold">Sign In</h2>

	<!-- Sign in with Email -->
	<SignIn provider="nodemailer" class="w-full rounded bg-blue-500 p-2 text-white"></SignIn>

	<!-- Sign in with OAuth Providers -->
	<SignIn provider="github" class="mt-4 w-full rounded bg-gray-900 p-2 text-center text-white"
	></SignIn>

	<SignIn provider="google" class="mt-2 w-full rounded bg-red-500 p-2 text-white"></SignIn>
</div>
