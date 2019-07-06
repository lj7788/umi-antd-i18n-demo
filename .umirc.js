
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport:true,
      title: 'Umi I18N Demo',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://localhost:3000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
