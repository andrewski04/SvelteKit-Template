<script lang="ts">
	const { data } = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">
			{data.wasLoggedIn ? 'Successfully Logged Out' : 'Not Logged In'}
		</h1>

		<p class="mb-8 text-center text-gray-600">
			{data.wasLoggedIn
				? 'You have been successfully logged out of your account.'
				: 'You were not logged in to begin with.'}
		</p>

		<div class="flex justify-center">
			<a
				href="/"
				class="rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
			>
				Return to Home
			</a>
		</div>
	</div>
</div>
