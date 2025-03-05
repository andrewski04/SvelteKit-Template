<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<header>
	<nav>
		<SignIn>
			<span slot="submitButton">Sign In</span>
		</SignIn>
	</nav>
</header>
