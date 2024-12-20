<script lang="ts">
	import { snake_case } from '../utils';
	import { onMount } from 'svelte';

	const {
		title,
		author = '',
		recommended = false
	}: {
		title: string;
		author: string;
		recommended: boolean;
	} = $props();
	let display = $state(false);

	const setDisplay = () => {
		display = window.location.hash.slice(1) == snake_case(title);
	};
	onMount(setDisplay);

	const reset = () => {
		display = false;
		window.history.replaceState(
			'',
			document.title,
			window.location.pathname + window.location.search + '#'
		);
	};
</script>

<svelte:window on:hashchange={setDisplay} />

<div class:display class="container">
	<button onclick={reset} class="close">&times</button>

	{#if recommended}
		<h3 class="recommended">
			<b style="width: 100%; text-al"> Recommended: </b>
		</h3>
	{/if}
	<h2>{title}</h2>
	{#if author}
		<span>by</span>&nbsp;<b>{author}</b>
	{/if}
	<slot />
	<!-- ^ for markdown component -->
</div>

<style>
	.recommended {
		display: flex;
		align-items: center;
	}
	div.container {
		display: none;
		/* centered */
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(256, 256, 256, 0.85);
		padding: 2rem;
		max-width: 800px;
		max-height: 400px;
		width: 80vw;
	}
	h2 {
		margin-top: 0;
	}
	div.display {
		display: block;
	}
	button.close {
		position: absolute;
		display: inline;
		top: 0.5rem;
		right: 0.5rem;
	}
</style>
