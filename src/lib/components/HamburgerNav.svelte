<script lang="ts">
  import { base } from "$app/paths";
  import frontA0 from "../../routes/front/a0/title";
  import frontA1 from "../../routes/front/a1/title";
  import frontA2 from "../../routes/front/a2/title";
  import frontA3 from "../../routes/front/a3/title";
  import frontB0 from "../../routes/front/b0/title";
  import frontB1 from "../../routes/front/b1/title";
  import frontB2 from "../../routes/front/b2/title";
  import frontB3 from "../../routes/front/b3/title";

  import backA0 from "../../routes/back/a0/title";
  import backA1 from "../../routes/back/a1/title";
  import backA2 from "../../routes/back/a2/title";
  import backA3 from "../../routes/back/a3/title";
  import backB0 from "../../routes/back/b0/title";
  import backB1 from "../../routes/back/b1/title";
  import backB2 from "../../routes/back/b2/title";
  import backB3 from "../../routes/back/b3/title";

  import childrensLit from "../../routes/childrens/title";
  import childrensTop from "../../routes/childrens/top/title";
  import childrensMid from "../../routes/childrens/middle/title";
  import childrensBottom from "../../routes/childrens/bottom/title";

  import nonfiction from "../../routes/nonfiction/title";
  import nonfictionTop from "../../routes/nonfiction/top/title";
  import nonfictionMid from "../../routes/nonfiction/middle/title";
  import nonfictionBottom from "../../routes/nonfiction/bottom/title";

  const shelves: Shelf[] = [
    { title: "Search", href: "/search" },
    { title: "Index", href: "/" },
    { title: "Classics", href: "/classics" },
    { title: "Overall", href: "/overall" },
    {
      title: "Front",
      children: [
        { title: frontA0, href: "/front/a0" },
        { title: frontA1, href: "/front/a1" },
        { title: frontA2, href: "/front/a2" },
        { title: frontA3, href: "/front/a3" },
        { title: frontB0, href: "/front/b0" },
        { title: frontB1, href: "/front/b1" },
        { title: frontB2, href: "/front/b2" },
        { title: frontB3, href: "/front/b3" },
      ],
    },
    {
      title: "Back",
      children: [
        { title: backA0, href: "/back/a0" },
        { title: backA1, href: "/back/a1" },
        { title: backA2, href: "/back/a2" },
        { title: backA3, href: "/back/a3" },
        { title: backB0, href: "/back/b0" },
        { title: backB1, href: "/back/b1" },
        { title: backB2, href: "/back/b2" },
        { title: backB3, href: "/back/b3" },
      ],
    },
    {
      title: nonfiction,
      href: "/nonfiction",
      children: [
        { title: nonfictionTop, href: "/nonfiction/top" },
        { title: nonfictionMid, href: "/nonfiction/middle" },
        { title: nonfictionBottom, href: "/nonfiction/bottom" },
      ],
    },
    {
      title: childrensLit,
      href: "/childrens",
      children: [
        { title: childrensTop, href: "/childrens/top" },
        { title: childrensMid, href: "/childrens/middle" },
        { title: childrensBottom, href: "/childrens/bottom" },
      ],
    },
  ];

  type Shelf = { title: string; href?: string; children?: Shelf[] };
</script>

{#snippet shelf({ href, title, children }: Shelf)}
  <li>
    {#if href}<a href={base + href}>{title}</a>
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
    max-height: 99vh;
    overflow-y: scroll;
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
