module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [["inline-dotenv",{
        path: '.env.production'
      }]]
    },
    staging: {
      plugins: [["inline-dotenv", {
        path: 'env.staging'
      }]]
    },
    development: {
      plugins: [["inline-dotenv",{
        path: '.env.development'
      }]]
    }
  }
};
