<script lang="ts">
  const shelves: Shelf[] = [
    { title: "Index", href: "/" },
    { title: "Classics", href: "/classics" },
    {
      title: "Nonfiction",
      href: "/nonfiction",
      children: [
        { title: "TODO", href: "/nonfiction/top" },
        { title: "TODO", href: "/nonfiction/middle" },
        { title: "TODO", href: "/nonfiction/bottom" },
      ],
    },
    {
      title: "Back",
      children: [
        { title: "Terry Pratchett books", href: "/back/a0" },
        { title: "Mythology", href: "/back/a1" },
        { title: "Modern novels", href: "/back/a2" },
        { title: "Misc", href: "/back/a3" },
        { title: "Light fiction", href: "/back/b0" },
        { title: "Strange", href: "/back/b1" },
        { title: "Sci-Fi", href: "/back/b2" },
        { title: "Bad Sci-Fi", href: "/back/b3" },
      ],
    },
    {
      title: "Front",
      children: [
        { title: "TODO", href: "/front/a0" },
        { title: "TODO", href: "/front/a1" },
        { title: "TODO", href: "/front/a2" },
        { title: "TODO", href: "/front/a3" },
        { title: "TODO", href: "/front/b0" },
        { title: "TODO", href: "/front/b1" },
        { title: "TODO", href: "/front/b2" },
        { title: "TODO", href: "/front/b3" },
      ],
    },
    { title: "Overall", href: "/" },
    {
      title: "Children's Literature",
      href: "/childrens",
      children: [
        { title: "top", href: "/childrens/top" },
        { title: "Harry Potter", href: "/childrens/middle" },
        { title: "bottom", href: "/childrens/bottom" },
      ],
    },
  ];

  type Shelf = { title: string; href?: string; children?: Shelf[] };
</script>

{#snippet shelf({ href, title, children }: Shelf)}
  <li>
    {#if href}<a {href}>{title}</a>
    {:else}<span>{title}</span>{/if}

    {#if children}
      <ul>
        {#each children as child}
          {@render shelf(child)}
        {/each}
      </ul>
    {/if}
  </li>
{/snippet}

<div class="container">
  <label for="menu-toggle">☰</label>
  <input type="checkbox" id="menu-toggle" />
  <!-- the hamburger: toggles the menu -->
  <nav>
    <ul>
      {#each shelves as s}
        {@render shelf(s)}
      {/each}
    </ul>
  </nav>
</div>

<style>
  input,
  nav {
    display: none;
  }
  input:checked + nav {
    display: block;
  }
  label {
    cursor: pointer;
  }
  ul {
    list-style: none;
    align-items: center;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  li {
    margin: 1ch;
  }
  label,
  .container {
    float: right;
    position: relative;
    margin: 0 1em 0 1em;
  }

  /* div {
    position: fixed;
    top: 0;
    right: 0;
    padding: 1ch;
    z-index: 1;
  } */
  /* div.open {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(256, 256, 256, 0.85);
    padding: 2rem;
    max-width: 800px;
    max-height: 400px;
    width: 80vw;
  } */
</style>
