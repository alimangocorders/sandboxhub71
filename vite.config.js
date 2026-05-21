import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform-perf-optimization',
      transformIndexHtml(html) {
        /*
          FIX A — Make ALL built CSS chunks non-blocking.
          Converts every <link rel="stylesheet"> into the print-swap pattern.
          This fires on the Vite-generated index.html in the dist/ output,
          covering both index-*.css and vendor-*.css automatically.
        */
        return html.replace(
          /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
          `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'">` +
          `<noscript><link rel="stylesheet" href="$1"></noscript>`
        );
      },
    },
  ],

  build: {
    target: 'esnext',
    assetsInlineLimit: 4096,
    cssCodeSplit: true, // Each chunk gets its own CSS — smaller per-route payloads

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          /*
            FIX C/D — Split vendor-core further so the browser can
            parallelise downloads and skip chunks it doesn't need yet.

            GSAP stays in vendor-animation (already done).
            ScrollTrigger is split out of vendor-core because it's only
            needed once ScrollTrigger.registerPlugin() is called — which
            only happens in App.jsx. Keeping it separate means it can be
            loaded after the initial render.

            react-dom is the heaviest React piece and benefits from its
            own long-term cache entry.
          */
          if (id.includes('gsap')) return 'vendor-animation';
          if (id.includes('react-dom')) return 'vendor-react-dom';
          if (id.includes('react')) return 'vendor-react';
          // Everything else (utilities, small deps) stays in vendor-core
          return 'vendor-core';
        },
      },
    },
  },
});