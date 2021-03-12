module.exports = {
  exclude: "<rootDir>/node_modules",
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
          browsers: [">0.25%", "not op_mini all", "IE 11"],
        },
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-typescript",
      { isTSX: true, allExtensions: true },
    ],
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-transform-runtime", { regenerator: true }],
  ],
};
