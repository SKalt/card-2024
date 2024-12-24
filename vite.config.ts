import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type PluginOption } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import markdown, {Mode} from "vite-plugin-markdown";
const md = markdown({mode: [Mode.HTML]})
export default defineConfig({
  plugins: [enhancedImages(), sveltekit(), md as PluginOption ],
  // assetsInclude: ["*.md"],
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
