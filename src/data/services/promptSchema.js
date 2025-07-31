// promptSchema.js
export const promptSchema = {
  type: "object",
  properties: {
    prompt: {
      type: "string",
      minLength: 5
    }
  },
  required: ["prompt"]
};
