<script lang="ts">
  import type { Writable } from "svelte/store";
  import { clear, drawShape } from "../utils";
  import type { Coords } from "../utils";
  import { getContext } from "svelte";

  const {
    setStyle,
    href = "",
    alt = "",
    coords = [],
  }: {
    setStyle: (ctx: CanvasRenderingContext2D) => void;
    href: string;
    alt: string;
    coords: Array<[number, number]>;
  } = $props();
  let ratio: number = $state(1);
  const ratioStore: Writable<number> = getContext("ratioStore");
  let canvas: HTMLCanvasElement;
  const canvasStore: Writable<HTMLCanvasElement> = getContext("canvasStore");
  ratioStore.subscribe((r) => (ratio = r));
  canvasStore.subscribe((c) => (canvas = c));

  const handleMouseEnter = () => {
    console.log({ ratio });
    if (canvas) {
      drawShape(canvas, transformedCoords, setStyle);
    }
  };
  const handleMouseLeave = () => {
    if (canvas) clear(canvas);
  };
  const transformedCoords = coords.map((coord) => coord.map((n) => n / ratio) as [number, number]);
  const strCoords = transformedCoords.map((coord) => coord.join(",")).join(",");
</script>

<area
  shape="poly"
  coords={strCoords}
  {alt}
  {href}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
/>
