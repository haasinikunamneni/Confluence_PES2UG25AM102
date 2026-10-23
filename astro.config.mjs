import { defineConfig } from 'astro/config';

// The public event website is statically generated at build time.
export default defineConfig({
  output: 'static',
  site: 'https://your-domain.example', // Replace with the confirmed deployment domain.
  trailingSlash: 'never',
  devToolbar: { enabled: false },
});
