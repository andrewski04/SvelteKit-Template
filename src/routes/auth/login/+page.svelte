<script>
	let email = '';
	let message = '';

	async function requestMagicLink() {
		const res = await fetch('/api/auth/request', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: { 'Content-Type': 'application/json' }
		});
		const data = await res.json();
		message = data.message || data.error;
	}
</script>

<input type="email" bind:value={email} placeholder="Enter your email" required />
<button on:click={requestMagicLink}>Send Magic Link</button>
<p>{message}</p>
