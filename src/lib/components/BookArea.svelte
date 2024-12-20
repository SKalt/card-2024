<script lang="ts">
	import { snake_case, defaultStyle, recommendedStyle } from '../utils';

	import HoverableArea from './HoverableArea.svelte';
	let {
		title = '',
		author = '',
		coords = [],
		recommended = false
	}: {
		title: string;
		author: string;
		coords: Array<[number, number]>;
		recommended: boolean;
	} = $props();
	const href = `#${snake_case(title)}`;
	const alt = `${title} by ${author}`;
	const setStyle = recommended ? recommendedStyle : defaultStyle;
</script>

<HoverableArea {setStyle} {coords} {href} {alt} />
