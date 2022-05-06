export default {
  expo: {
    name: "the-framework",
    slug: "the-framework",
    version: process.env.RELEASE_VERSION || require("./package.json").version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      "fallbackToCacheTimeout": 0
    },
    scheme: "theframework",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.finnternet.theframework"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.finnternet.theframework"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
  }
}
