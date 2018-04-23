var config = {
   entry: './component/ts/root.jsx',
   output: {
      filename: './output/bundle.js',
   },
   devServer: {
      inline: true,
      port: 8888,
   },
   node: {
	  fs: "empty",
	  net: "empty",
	  tls: "empty"
  },
  devtool: "#eval-source-map",
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
		 {
			test: /\.scss$/,
			use: [
			{loader: "style-loader"},
			{loader: "css-loader" },
			{loader: "sass-loader",
             options: {
             importer: function(url, prev) {
             if(url.indexOf('@material') === 0) {
             var filePath = url.split('@material')[1];
             var nodeModulePath = `./node_modules/@material/${filePath}`;
             return { file: require('path').resolve(nodeModulePath) };
            }
             return { file: url };
           }
         }
         }]
		 }
      ]
   }
}
module.exports = config;
