import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

export default defineConfig({
  plugins: [mdPlugin({ mode: [Mode.HTML] }), enhancedImages(), sveltekit()],
  build: {
    watch: {
      exclude: [".direnv"], //.map((f) => path.resolve(__dirname, f))
    },
  },
  server: {
    fs: {
      allow: ["content"],
    },
    watch: {
      ignored: [".direnv"],
    },
  },
});
