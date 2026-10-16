/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: ["theme"] }],
    "at-rule-prelude-no-invalid": [true, { ignoreAtRules: ["theme"] }],
    "import-notation": "string",
    "no-invalid-position-declaration": [true, { ignoreAtRules: ["theme"] }],
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      {
        message: "Expected class selector to use camelCase",
        resolveNestedSelectors: true,
      },
    ],
  },
};
