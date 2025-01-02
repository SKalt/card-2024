<script lang="ts">
  import { writable, type Readable, type Writable } from "svelte/store";
  import { clear, type Coords, drawShape } from "../utils";
  import { getContext, hasContext, onDestroy, onMount, tick, type Snippet } from "svelte";
  import ShapeEditor from "./ShapeEditor.svelte";

  const {
    setStyle,
    href = "",
    title = "",
    coords: initialCoords = [],
    onclick = () => {},
    pinned = $bindable(false),
  }: {
    setStyle: (ctx: CanvasRenderingContext2D) => void;
    href: string;
    title: string;
    coords: Coords;
    onclick?: (e: MouseEvent) => void;
    pinned?: boolean;
  } = $props();

  let ratio: number = $state(1);
  const ratioStore: Readable<number> = getContext("ratioStore");
  let canvas: HTMLCanvasElement | null = $state(null);
  const canvasStore: Readable<HTMLCanvasElement | null> = getContext("canvasStore");
  const renderCallbacks: Writable<Array<(ctx: CanvasRenderingContext2D) => void>> =
    getContext("drawCallbacks");

  const render = (ctx: CanvasRenderingContext2D) => {
    // console.log("rendering", title, transformedCoords);
    drawShape(ctx, transformedCoords, setStyle);
  };
  render["title"] = title;
  const registerDrawing = () => {
    renderCallbacks.update((callbacks) => callbacks.filter((cb) => cb !== render).concat([render]));
  };
  const deregisterDrawing = () => {
    renderCallbacks.update((callbacks) => callbacks.filter((cb) => cb !== render));
  };

  onDestroy(() => deregisterDrawing());
  let coords = $state([...initialCoords]);
  let transformedCoords = $derived(
    coords.map((coord) => coord.map((n) => n / ratio) as [number, number]),
  );
  let strCoords = $derived(transformedCoords.map((coord) => coord.join(",")).join(","));

  ratioStore.subscribe((r) => (ratio = r));
  canvasStore.subscribe((c) => (canvas = c));

  const onmouseenter = () => registerDrawing();
  const onmouseleave = () => {
    if (!pinned) deregisterDrawing();
  };
  $effect(() => {
    // if (pinned) console.log("registering", title);
    pinned ? registerDrawing() : deregisterDrawing();
  });
  const shapeStore = writable<Coords>(initialCoords);
  shapeStore.subscribe((s) => (coords = s));

  const sideStore: Writable<Snippet | null> | undefined = getContext("side");
  const y = side;
  const oncontextmenu = (e: MouseEvent) => {
    e.preventDefault();
    if (sideStore) {
      sideStore.set(y as Snippet);
    }
  };
</script>

{#snippet side()}
  <ShapeEditor {shapeStore} {ratio} {canvas} />
{/snippet}

<area
  shape="poly"
  coords={strCoords}
  alt={title}
  {title}
  {href}
  {onmouseenter}
  {onmouseleave}
  {onclick}
  {oncontextmenu}
  data-ratio={ratio}
  data-side-defined={!!side}
/>
