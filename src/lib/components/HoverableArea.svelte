<script lang="ts">
  import type { Readable } from "svelte/store";
  import { clear, type Coords, drawShape } from "../utils";
  import { getContext, onMount, tick, type Snippet } from "svelte";

  const {
    setStyle,
    href = "",
    alt = "",
    coords = [],
    onclick = () => {},
  }: {
    setStyle: (ctx: CanvasRenderingContext2D) => void;
    href: string;
    alt: string;
    coords: Array<[number, number]>;
    onclick: (e: MouseEvent) => void;
  } = $props();

  let ratio: number = $state(1);
  const ratioStore: Readable<number> = getContext("ratioStore");
  let canvas: HTMLCanvasElement | null;
  const canvasStore: Readable<HTMLCanvasElement | null> = getContext("canvasStore");
  // ratioStore.subscribe((r) => {
  //   ratio = r;
  //   console.log({ received: ratio });
  // });
  let transformedCoords = $state(
    coords.map((coord) => coord.map((n) => n / ratio) as [number, number]),
  );
  let strCoords = $state(transformedCoords.map((coord) => coord.join(",")).join(","));

  ratioStore.subscribe((r) => {
    ratio = r;
    // console.log(href, "received", r);
    transformedCoords = coords.map((coord) => coord.map((n) => n / ratio) as [number, number]);
    strCoords = transformedCoords.map((coord) => coord.join(",")).join(",");
  });
  canvasStore.subscribe((c) => (canvas = c));

  const onmouseenter = () => {
    if (canvas) drawShape(canvas, transformedCoords, setStyle);
  };
  const onmouseleave = () => {
    if (canvas) clear(canvas);
  };
  let download = $state("");
  let downloadUrl = $state("");
  let done = $state(false);
  // const sideStore: Writable<Snippet | null> = getContext("side");

  // const tempHandleClick = () => {
  //   const ok = confirm("save as book or delete");
  //   if (ok) {
  //     const title = prompt("title");
  //     if (!title) return;
  //     const author = prompt("author");
  //     const md = [
  //       `---`,
  //       `title: "${title}"`,
  //       `author: "${author ?? ""}"`,
  //       `shape: ${JSON.stringify(coords)}`,
  //       `---`,
  //     ]
  //       .map((line) => line + "\n")
  //       .join("");
  //     downloadUrl = `data:application/octet-stream;base64,${btoa(md)}`;
  //     download = snake_case(title) + ".md";
  //     // const blob = new Blob([md], { type: "text/plain" });
  //     // saveFile(blob);
  //     // new Promise<string>((res) => {
  //     //   const fr = new FileReader();
  //     //   fr.onload = (e) => res(e.target!.result as any);
  //     //   fr.readAsDataURL(blob);
  //     // }).then((du: string) => (downloadUrl = du));
  //     console.log("book: " + href);
  //   } else {
  //     console.log("delete: " + href);
  //   }
  //   done = true;
  // };
  onMount(() => {
    if (href == "#0_0") {
      console.log(href);
      const initialSplash = () => {
        if (canvas) {
          console.log(href, ratio);
          const ctx = canvas.getContext("2d");
          drawShape(canvas, transformedCoords, setStyle);
          tick().then(() => drawShape(canvas!, transformedCoords, setStyle));
          // if (!ctx) throw new Error("could not acquire context2d");
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          console.log("no canvas; delaying", href);
          tick().then(initialSplash);
        }
      };
      initialSplash();
    }
  });
</script>

{#if downloadUrl}
  <div data-sveltekit-preload-data="false">
    <a
      {download}
      href={downloadUrl}
      onclick={() => (downloadUrl = "")}
      style="position: absolute; top:0;"
    >
      Download
    </a>
  </div>
{/if}
{#if !done}
  <area
    shape="poly"
    coords={strCoords}
    {alt}
    {href}
    {onmouseenter}
    {onmouseleave}
    {onclick}
    data-ratio={ratio}
  />
{/if}
