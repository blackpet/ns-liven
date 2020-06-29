<script>

	export let segment;

	import GotoButton from "../components/GotoButton.svelte";
	import Nav from '../components/Nav.svelte';
	import {goto, stores} from '@sapper/app'

	const {page} = stores()

	const popups = []
	const indexes = ['/', '/tutor', '/student']
	let here
	$: isPopup = true //popups.includes(here)
	$: isSubpage = !indexes.includes(here)

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		page.subscribe(({path, params, query}) => {
			here = window.location.pathname
			console.log('window.location.pathname', here)
		});
	}


</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 0;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

{#if !isPopup}
<Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>

<GotoButton {isSubpage} />
