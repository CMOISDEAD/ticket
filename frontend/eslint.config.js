import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please use <Link /> from @/navigation instead.",
          importNames: ["default"],
        },
        {
          name: "next/navigation",
          message: "Please use <Navigation /> from @/navigation instead.",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePahtname",
          ],
        },
      ],
    },
  },
];
