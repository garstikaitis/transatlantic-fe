module.exports = {
    pwa: {
        workboxPluginMode: "GenerateSW",
        workboxOptions: {
            exclude: [/\.map$/, /netlify.toml/],
            // ...other Workbox options...
        },
    },
    vite: {
        optimizeDeps: {
            include: ["vue", "vue-router", "vuex"],
        },
    },
};
