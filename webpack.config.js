const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const episodes = require('./mocks/episodes');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: true,
  },
  devServer: {
    historyApiFallback: true,
    before: app => {
      app.get('/api/episodes', (request, response) => {
        response.json(episodes);
      });

      app.get('/api/episodes/:id', (request, response) => {
        const foundEpisode = episodes.find(episode => episode.id === request.params.id);
        if (foundEpisode) {
          response.json(foundEpisode);
        } else {
          response.sendStatus(404);
        }
      });

      episodes.forEach(episode => {
        app.get(episode.audio, (request, response) => {
          response.sendFile(path.resolve(__dirname, 'mocks', 'audio', path.basename(request.url)));
        });

        episode.markers
          .filter(marker => marker.type === 'image')
          .forEach(marker => {
            app.get(marker.content, (request, response) => {
              response.sendFile(path.resolve(__dirname, 'mocks', 'images', path.basename(request.url)));
            });
          });
      });
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ]
}
