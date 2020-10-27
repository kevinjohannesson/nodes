// vue.config.js
module.exports = {
  // options...
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          indentedSyntax: true,
        },
        // Note: the following config format is different between Vue CLI v4 and v3
        // For Vue CLI v3 users, please refer to css-loader v1 documentations
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        // modules: {
        //   localIdentName: '[name]-[hash]'
        // },
        // localsConvention: 'camelCaseOnly'
      },
    },
  },
  // css: {
  //   module: {
  //     rules: [
  //       // ... other rules omitted

  //       // this will apply to both plain `.scss` files
  //       // AND `<style lang="scss">` blocks in `.vue` files
  //       {
  //         test: /\.sass$/,
  //         use: [
  //           'vue-style-loader',
  //           'css-loader',
  //           {
  //             loader: 'sass-loader',
  //             options: {
  //               indentedSyntax: true,
  //               // sass-loader version >= 8
  //               sassOptions: {
  //                 indentedSyntax: true,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
};
