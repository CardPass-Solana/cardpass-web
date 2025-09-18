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
			// Wrangler configuration (equivalent to wrangler.toml)
			wrangler: {
				vars: {
					API_URL: "https://mihari-temp.yeongmin.net",
				},
			},
		},
	},
});
