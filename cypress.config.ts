import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
        setupNodeEvents(on, config) {
            config.env = {
                URL_API: "http://localhost:3000",
                URL_FRONT: " http://localhost:8080"
            }

            return config
        },
    },
    e2e: {
        baseUrl: 'http://localhost:8080'
    }
});
