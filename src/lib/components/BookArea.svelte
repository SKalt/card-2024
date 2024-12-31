<script lang="ts">
  import { getContext, onMount, type Snippet } from "svelte";
  import { snake_case, defaultStyle, recommendedStyle, type Coords } from "../utils";

  import HoverableArea from "./HoverableArea.svelte";
  import { writable, type Readable, type Writable } from "svelte/store";
  import { pushState } from "$app/navigation";
  import ShapeEditor from "./ShapeEditor.svelte";
  let {
    title = "",
    author = "",
    coords = [],
    recommended = false,
    html = "",
  }: {
    title: string;
    author: string;
    coords: Coords;
    recommended: boolean;
    html?: string;
  } = $props();
  const slug = snake_case(title);
  const href = `#${slug}`;
  const alt = `${title} by ${author}`;
  const setStyle = recommended ? recommendedStyle : defaultStyle;

  let ratio: number = $state(1);
  const ratioStore: Readable<number> = getContext("ratioStore");
  ratioStore.subscribe((r) => (ratio = r));

  let canvas: HTMLCanvasElement | null = $state(null);
  const canvasStore: Readable<HTMLCanvasElement | null> = getContext("canvasStore");
  canvasStore.subscribe((c) => (canvas = c));

  const sideStore: Writable<Snippet | null> = getContext("side");
  const pageTitle: Writable<string> = getContext("title");
  const onclick = (e: MouseEvent) => {
    e.preventDefault();
    sideStore.set(side);
    pageTitle.set(title);
    pushState(href, {});
  };
  const checkFocus = () => {
    if (window.location.hash !== href) return;
    sideStore.set(side);
    pageTitle.set(title);
  };
  onMount(() => checkFocus());
  const shapeStore = writable<Coords>(coords);
  shapeStore.subscribe((s) => (coords = s)); // ????
</script>

<svelte:window on:hashchange={checkFocus} />

{#snippet side()}
  <div>
    <ShapeEditor {shapeStore} {ratio} {canvas} />
    <!-- TODO: editor button -->
    <h1>{title}</h1>
    <p>by <em>{author}</em></p>
    {@html html}
  </div>
{/snippet}

<HoverableArea {setStyle} {coords} {href} {alt} {onclick} />
