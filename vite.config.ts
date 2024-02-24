import { sveltekit } from "@sveltejs/kit/vite";
import { exec } from "child_process";
import { promisify } from "util";
import type { UserConfig } from "vite";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

// Get current tag/commit and last commit date from git
const pexec = promisify(exec);
const [version, sha] = (
    await Promise.all([pexec("git describe --tags || git rev-parse --short HEAD"), pexec("git rev-parse --short HEAD")])
).map((v) => JSON.stringify(v?.stdout.trim()));

const config: UserConfig = {
    plugins: [sveltekit(), purgeCss()],
    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: ["./static/"]
        }
    },
    define: {
        __VERSION__: version,
        __COMMIT_SHA__: sha,
        __LASTMOD__: Date.now()
    }
};

export default config;
