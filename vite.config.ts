import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  root:'./dist',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "$": fileURLToPath(new URL("./src/lib", import.meta.url)),
      '!': fileURLToPath(new URL("./src/stores",import.meta.url)),
    },
  },
});
