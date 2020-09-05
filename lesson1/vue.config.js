module.exports = {
  publicPath: './',
  lintOnSave: true,
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: false,
      },
    },
  },
}
