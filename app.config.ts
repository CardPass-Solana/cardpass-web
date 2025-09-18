import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	server: {
		compatibilityDate: "2024-09-19",
		preset: "cloudflare_module",
		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
		// Cloudflare Workers environment variables (equivalent to wrangler.toml [vars])
		vars: {
			VITE_API_URL: "https://mihari-temp.yeongmin.net",
		},
	},
});
