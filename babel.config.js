module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      development: {
        plugins: [["inline-dotenv", {
          path: './envs/.env'
        }]]
      },
      development: {
        plugins: [["inline-dotenv", {
          path: './envs/.env'
        }]]
      },
    }
  };
};