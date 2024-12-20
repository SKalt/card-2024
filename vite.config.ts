import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
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
