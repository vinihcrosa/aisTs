import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/sixBitUtils.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true
})
