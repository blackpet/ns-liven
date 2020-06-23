<script>
	import GotoListButton from "../components/GotoListButton.svelte";

	export let segment;

	import Nav from '../components/Nav.svelte';
	import {goto, stores} from '@sapper/app'

	const {page} = stores()

	let indexes = ['/', '/tutor', '/student']
	let here
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

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<GotoListButton {isSubpage} />
