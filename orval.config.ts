import { defineConfig } from "orval";

export default defineConfig({
    storeMe: {
        input: {
            target: "./openapi.json",
        },
        output: {
            mode: "tags-split",
            client: "react-query",
            target: "src/gen/endpoints",
            schemas: "src/gen/models",
            mock: false,
            clean: true,
            httpClient: "axios",
            override: {
                mutator: {
                    name: "axiosInstanceFn",
                    path: "src/lib/axiosConfig.ts",
                },
            },
        },
    },
    storeMeZod: {
        input: {
            target: "./openapi.json",
        },
        output: {
            mode: "tags-split",
            client: "zod",
            target: "src/gen/endpoints",
            fileExtension: ".zod.ts",
        },
    },
});
