<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	a {
		text-decoration: underline;
		display: block;
		padding: 10px;
		background-color: #ff9d9d;
		text-align: center;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<a href="/">어머! 오류가 났네요. 혹시 새로고침 하셨나요? 그럼 처음부터 다시 해볼까요?</a>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
