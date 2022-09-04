const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: [
  ],
  outputDir: path.resolve(__dirname, "docs")
})
