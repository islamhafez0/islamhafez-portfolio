import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  build: {
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom'],
          'motion': ['framer-motion'],
          'ui-libs': ['lucide-react', 'react-intersection-observer'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Multiple compression passes for better optimization
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        dead_code: true,
        collapse_vars: true,
        reduce_vars: true,
      },
      mangle: {
        safari10: true, // Ensure Safari 10 compatibility
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Improve tree-shaking
    target: 'esnext',
    // Optimize module preloading
    modulePreload: {
      polyfill: true,
    },
  },
});
