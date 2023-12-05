// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  //   [
  //     'module:react-native-dotenv',
  //     {
  //       moduleName: 'react-native-dotenv',
  //       envName: 'ENVFILE',
  //     },
  //   ],
  //   [
  //     'module-resolver',
  //     {
  //       root: ['./src'],
  //       extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
  //       alias: {
  //         'test/*': ['./test/'],
  //       },
  //     },
  //   ],
  ],
};