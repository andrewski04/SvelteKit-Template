<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<form method="POST">
	<input type="email" name="email" placeholder="Enter your email" required />
	<button type="submit">Send Magic Link</button>
</form>

{#if form?.error}
	<p style="color: red;">{form.error}</p>
{/if}
