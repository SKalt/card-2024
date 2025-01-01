<script lang="ts">
  import { base } from "$app/paths";

  import Page from "$lib/components/Page.svelte";
  import type { Book, Coords } from "$lib/utils";
  import picture from "../../img/cropped/overall/index.jpg?enhanced";
  const title = "Happy New Year!";
  const htmlTitle = "Happy <s>Holidays</s> New Year!";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: {
        title: string;
        author: string;
        shape: Coords;
        recommended?: boolean;
        easter_egg?: boolean;
      };
      html: string;
    }
  >("../../content/shelves/index/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      easter_egg: !!b.attributes.easter_egg,
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

<Page {picture} {title} {htmlTitle} {books} {externalShapes}>
  {#snippet side()}
    <div>
      <div>
        <p>
          Once again I started development of our holiday card too late to send it during the
          holidays. Now that we've settled into Philadelphia, we've been busily filling out our
          library from the local used book stores. We're up to 422 books from 87-ish books in <a
            href="https://happy-holidays.now.sh/2021"
            target="2021">2021</a
          >!
        </p>
        <h2>Instructions</h2>
        <p>Search the shelves for book recommendations for 2025!</p>
        <p>
          Search the image for things to click. Hovering over a clickable area will show an outline.
          Most things are clickable, so click around!
        </p>
        <p>
          Click on a shelf to navigate to it. Make sure to scroll left and right to view all the
          books on the shelf.
        </p>
        <p>
          Books we recommend will be listed with a 🌟 next to their title. Hovering over a
          recommended book will show a solid outline. Click on the book to reveal more information
          about it.
        </p>
        <p>
          To navigate back to a prior shelf, you can use the back button in your browser, or click
          the navigation menu in the top-right corner. To find a specific book, go to the <a
            href="{base}/search">search page</a
          >.
        </p>
      </div>
    </div>
  {/snippet}
</Page>
