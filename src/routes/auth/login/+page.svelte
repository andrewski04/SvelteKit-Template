<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<form method="POST">
	<input type="email" name="email" placeholder="Enter your email" required />
	<button type="submit">Send Magic Link</button>
</form>

<!-- Display messages returned from the server -->
{#if form?.success}
	<p style="color: green;">{form.message}</p>
{/if}

{#if form?.success == false}
	<p style="color: red;">{form.error}</p>
{/if}
