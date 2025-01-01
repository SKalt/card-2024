<script lang="ts">
  import Fuse from "fuse.js/min-basic";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/childrens/top/*.md", { eager: true });
</script>

<search>
  <label for="search">Search books</label>
  <input type="search" id="search" placeholder="Title or author" />
</search>
