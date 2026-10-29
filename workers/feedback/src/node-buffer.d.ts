// Only what index.ts uses; nodejs_compat provides the real module at runtime.
declare module "node:buffer" {
  export const Buffer: {
    from(data: ArrayBuffer): { toString(encoding: "base64"): string };
  };
}
