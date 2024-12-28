<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { snake_case, defaultStyle, recommendedStyle } from "../utils";

  import HoverableArea from "./HoverableArea.svelte";
  import type { Writable } from "svelte/store";
  let {
    title = "",
    author = "",
    coords = [],
    recommended = false,
    html = "",
  }: {
    title: string;
    author: string;
    coords: Array<[number, number]>;
    recommended: boolean;
    html?: string;
  } = $props();
  const href = `#${snake_case(title)}`;
  const alt = `${title} by ${author}`;
  const setStyle = recommended ? recommendedStyle : defaultStyle;
  const ctx: Writable<Snippet> = getContext("side");
  const onclick = () => {
    ctx.set(side);
    console.log("set", html);
  };
</script>

{#snippet side()}
  <div>
    <h1>{title}</h1>
    <p>{author}</p>
    {@html html}
  </div>
{/snippet}

<HoverableArea {setStyle} {coords} {href} {alt} {onclick} />
