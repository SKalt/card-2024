<script lang="ts">
  import { snake_case, type Coordinate, type Coords } from "$lib/utils";

  const { canvas = null, ratio }: { canvas: HTMLCanvasElement | null; ratio: number } = $props();
  let mutable = $state<Coords>([]);
  type Mode =
    | "none" // => adding
    | "adding" // => done
    | "done"; // => adding
  let mode = $state<Mode>("none");
  let cursor = $state<Coordinate>([0, 0]);
  let title = $state("");
  let shelf = $state("");
  let slug = $derived(title ? snake_case(title) : shelf.split("/").slice(-1)[0]);
  let href = $derived(`${shelf}#${slug}`);
  let description = $state("");

  let download = $derived.by(() => (description ? `${slug}.md` : `${slug}.json`));

  const shelves = ["front", "back"]
    .map((side) =>
      ["a", "b"].map((col) => Array.from({ length: 4 }, (_, i) => `/${side}/${col}${i}`)),
    )
    .flat(4)
    .concat(
      ["nonfiction", "childrens"]
        .map((shelf) => ["top", "middle", "bottom"].map((lvl) => `/${shelf}/${lvl}`))
        .flat(2),
    );
  let author = $state("");
  let value = $derived.by(() => {
    if (!description) {
      return JSON.stringify({ shape: "SHAPE", href, title, shelf }, null, 2).replace(
        '"SHAPE"',
        JSON.stringify(mutable),
      );
    } else {
      return `---\nshape: ${JSON.stringify(mutable)}\nauthor: ${author}\nhref: ${href}\n---\n${description}`;
    }
  });
  let downloadUrl = $derived(`data:application/octet-stream;base64,${btoa(value)}`);
  // const debounce = (fn: Function, ms: number) => {
  //   let timeout: NodeJS.Timeout;
  //   return function (this: any, ...args: any[]) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => fn.apply(this, args), ms);
  //   };
  // };
  const render = () => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mutable.length) {
      // draw the lines
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 1;
      const [x, y] = mutable[0].map((c) => c / ratio);
      ctx.moveTo(x, y);
      ctx.beginPath();

      for (let i = 0; i < mutable.length; i++) {
        const [x, y] = mutable[i].map((c) => c / ratio);
        ctx.lineTo(x, y);
      }
      if (mode === "adding") {
        ctx.lineTo(cursor[0], cursor[1]);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = "white";
      for (let c of mutable) {
        const x = c[0] / ratio;
        const y = c[1] / ratio;
        ctx.moveTo(x, y);
        ctx.fillRect(x, y, 4, 4);
      }
    }
  };
  let toCopy: HTMLTextAreaElement | null = $state(null);

  const doCopy = () => {
    toCopy!.select();
    document.execCommand("copy");
  };
  const onmousemove = (e: MouseEvent) => {
    cursor = [e.offsetX, e.offsetY];
    render();
  };
  const onkeydown = (e: KeyboardEvent) => {
    console.log({ key: e.key, ctrl: e.ctrlKey });
    if (e.ctrlKey && e.key == "z") {
      e.preventDefault();
      mutable.pop();
      render();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      setState("done");
    }
  };
  const onclick = (e: MouseEvent) => {
    mutable.push([e.offsetX, e.offsetY].map((c) => Math.round(c * ratio)) as Coordinate);
    render();
  };
  const setState = (m: Mode) => {
    mode = m;
    if (!canvas) return;
    if (mode === "adding") {
      canvas.style.pointerEvents = "auto";
      canvas.style.cursor = "crosshair";
      canvas.contentEditable = "true";
      canvas.focus();
      canvas.addEventListener("click", onclick);
      canvas.addEventListener("mousemove", onmousemove);
      canvas.addEventListener("keydown", onkeydown);
      render();
    } else if (mode === "done") {
      canvas.style.pointerEvents = "none";
      canvas.contentEditable = "false";
      canvas.removeEventListener("mousemove", onmousemove);
      canvas.removeEventListener("keydown", onkeydown);
      canvas.removeEventListener("click", onclick);
      canvas.blur();
      render();
    } else if (mode === "none") {
      doCopy();
      mutable = [];
      author = "";
      description = "";
      setState("adding"); // temp
    }
  };
</script>

<!-- this is all for the sidebar -->

{#if mode === "none"}
  <button onclick={() => setState("adding")}> Add shape </button>
{/if}
{#if mode === "adding" || mode === "done"}
  <div>
    <label for="author">author</label><input name="author" bind:value={author} />
    <label for="title">title</label><input name="title" bind:value={title} />
    <select bind:value={shelf}>
      {#each shelves as shelf}
        <option value={shelf}>{shelf}</option>
      {/each}
    </select>
    <label for="description">description</label><textarea
      name="description"
      bind:value={description}
    ></textarea>
    <textarea bind:this={toCopy} style="font-family: monospace" onfocus={doCopy} onclick={doCopy}
      >{value}</textarea
    >

    {#if mode === "adding"}
      <button onclick={() => setState("done")}> Edit properties </button>
    {:else}
      <button onclick={() => setState("none")}> Done </button>
    {/if}
    <a {download} href={downloadUrl}>download</a>
  </div>
{/if}

<style>
  textarea {
    width: 100%;
  }
</style>
