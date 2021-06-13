import path from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/components/LoadingCp',
  },
  dva: {
    immer: true,
  },
  antd: {},
  sass: {
    implementation: require('node-sass'),
  },
  exportStatic: {},
  externals: {
    axios: 'window.axios',
  },
  scripts: ['http://h5.dooring.cn/cdn/axios.min.js'],
  base: '/pc_plus/',
  publicPath: '/pc_plus/',
  outputPath: './dist/pc_plus',
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/editor',
        },
        {
          path: '/editor',
          component: '../pages/editor',
        },
        {
          path: '/help',
          component: '../pages/help',
        },
        {
          path: '/mobileTip',
          component: '../pages/mobileTip',
        },
        {
          path: '/preview',
          component: '../pages/editor/preview',
        },
      ],
    },
  ],
  theme: {
    'primary-color': '#2F54EB',
    // "btn-primary-bg": "#2F54EB"
  },
  // extraBabelPlugins: [
  //   ['import', { libraryName: "zarm", style: true }],
  // ],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
  },
});
