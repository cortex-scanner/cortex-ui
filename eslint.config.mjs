// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import stylistic from "@stylistic/eslint-plugin";

export default withNuxt(
  stylistic.configs.customize({
    commaDangle: "never",
    quotes: "double",
    semi: true,
    indent: 2,
    braceStyle: "1tbs"
  })
);
