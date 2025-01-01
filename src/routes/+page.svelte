<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import type { Book, Coords } from "$lib/utils";
  import picture from "../../img/cropped/overall/index.jpg?enhanced";
  const title = "Happy <s>Holidays!</s> New Year!";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../content/shelves/index/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../content/shelves/index/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} {title} {books} {externalShapes}>
  {#snippet side()}
    <div>
      <div>Instructions go here</div>
    </div>
  {/snippet}
</Page>
