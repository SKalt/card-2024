<script lang="ts">
  import { snake_case, type Coords } from "$lib/utils";
  import type { Writable } from "svelte/store";

  // note: ratio and other image-context-related info need to be props since this
  // component may be used in a snippet that isn't a descendant of the ImgOverlay.
  const {
    shapeStore,
    ratio,
    canvas,
  }: {
    shapeStore: Writable<Coords>;
    ratio: number;
    canvas: HTMLCanvasElement | null;
  } = $props();
  type EditMode = "none" | "select" | "move" | "del";

  let title = $state("");
  let shelf = $state("");
  let slug = $derived(title ? snake_case(title) : shelf.split("/").slice(-1)[0]);
  let href = $derived(`${shelf}#${slug}`);
  let description = $state("");

  let download = $derived.by(() => (author || description ? `${slug}.md` : `${slug}.json`));

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
    if (!description && !author) {
      return JSON.stringify({ shape: "SHAPE", href, title, shelf }, null, 2).replace(
        '"SHAPE"',
        JSON.stringify(mutable),
      );
    } else {
      return `---\nshape: ${JSON.stringify(mutable)}\nauthor: ${author}\nhref: ${href}\n---\n${description}`;
    }
  });
  let downloadUrl = $derived(`data:application/octet-stream;base64,${btoa(value)}`);

  let mutable: Coords = $state([]);
  shapeStore.subscribe((s) => (mutable = s));
  let cursor = $state<[number, number]>([0, 0]); // in transformed coordinates
  let nearest = $state<number | null>(null);
  let selected = $state<number | null>(null);

  const debounce = (fn: Function, ms: number) => {
    let timeout: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const render = debounce(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(cursor[0], cursor[1], 4, 4);
    mutable.forEach(([x, y], i) => {
      if (i === selected) ctx.fillStyle = "blue";
      else if (i === nearest) ctx.fillStyle = "purple";
      else ctx.fillStyle = "white";
      ctx.fillRect(x / ratio, y / ratio, 4, 4);
    });
  }, 50);
  // TODO: setNearest?
  const onmousemove = (e: MouseEvent) => {
    cursor = [e.offsetX, e.offsetY];
    // find the nearest point in mutable
    const [n, _] = mutable.reduce(
      ([leader, minDist], curr, i) => {
        const dist = Math.sqrt(
          (curr[0] / ratio - cursor[0]) ** 2 + (curr[1] / ratio - cursor[1]) ** 2,
        );
        if (dist < minDist) return [i, dist];
        return [leader, minDist];
      },
      [-1, Infinity],
    );
    nearest = n;
    render();
  };

  let mode = $state<EditMode>("none");
  const setMode = (m: EditMode) => {
    if (mode == "none") {
      if (canvas) {
        canvas.style["pointerEvents"] = "auto";
        canvas.contentEditable = "true";
        canvas.focus();
        canvas.addEventListener("mousemove", onmousemove);
        canvas.addEventListener("click", (e) => {
          if (m == "move") {
            selected = nearest;
            render();
          }
        });
        canvas.addEventListener("keydown", (e) => {
          console.log(e.key);
          e.preventDefault();
          if (e.key === "Escape") {
            selected = null;
          } else if (["backspace", "delete"].includes(e.key.toLowerCase())) {
            if (selected !== null) {
              mutable.splice(selected, 1);
              selected = null;
            }
          } else if (e.key === "ArrowLeft") {
            if (selected !== null) mutable[selected][0] -= 1;
          } else if (e.key === "ArrowRight") {
            if (selected !== null) mutable[selected][0] += 1;
          } else if (e.key === "ArrowUp") {
            if (selected !== null) mutable[selected][1] -= 1;
          } else if (e.key === "ArrowDown") {
            if (selected !== null) mutable[selected][1] += 1;
          }

          render();
        });
      } else {
        console.log("no canvas");
      }
    }
    if (m == "none" && canvas) {
      canvas.style["pointerEvents"] = "none";
      canvas.blur();
      canvas.contentEditable = "false";
      canvas.removeEventListener("mousemove", onmousemove);
    }
    mode = m;
  };
</script>

<div>
  {#if mode == "none"}
    <button disabled={canvas === null} onclick={() => setMode("move")}>edit shape</button>
  {:else}
    <button
      onclick={() => {
        setMode("none");
        console.log(JSON.stringify(mutable));
      }}
    >
      done
    </button>
  {/if}
  {#if mode == "move"}
    <button>delete point</button>
  {/if}
  {#if mode == "del"}
    <button>move point</button>
  {/if}
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
    <textarea style="font-family: monospace; min-height: content">{value}</textarea>

    <a {download} href={downloadUrl}>download</a>
  </div>
</div>
