module.exports = {
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      exclude: [/\.map$/, /netlify.toml/],
      // ...other Workbox options...
    },
  },
};
