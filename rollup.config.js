import babel from "rollup-plugin-babel";
import multi from "@rollup/plugin-multi-entry";
module.exports = {
  input: ["./src/PolyfilledRegExp.js", "fluent.js/fluent/src/index.js"],
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    multi(),
    babel({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry",
            corejs: 3
          }
        ]
      ],
      plugins: [
        [
          "replace-identifiers",
          {
            RegExp: 'window["__fluent__PolyfilledRegExp"]'
          }
        ]
      ]
    })
  ]
};
