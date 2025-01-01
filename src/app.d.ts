// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Snippet } from "svelte";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageState {
      title?: string;
    }
    // interface Platform {}
  }
}

export {};

declare module "*.md" {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, { coords: Array<[number, number]> }>;
  // FIXME: add Book model's fields ^^^^^^

  // When "Mode.HTML" is requested
  const html: string;

  // Modify below per your usage
  export { attributes, html };
}
