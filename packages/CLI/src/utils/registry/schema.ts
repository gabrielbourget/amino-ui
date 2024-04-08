import { HttpsProxyAgent } from "https-proxy-agent"
import { z } from "zod";

export const registryIndexItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  directories: z.array(z.string()),
});

const { COMPONENT_REGISTRY_URL, HTTPS_PROXY } = process.env;

// - TODO: -> Replace default URL with actual hosted link once site is setup.
const baseUrl = COMPONENT_REGISTRY_URL ?? "https://wrapper-component-library.com";
const agent = HTTPS_PROXY ? new HttpsProxyAgent(HTTPS_PROXY) : undefined;

export const registryIndexSchema = z.array(registryIndexItemSchema);

export const fetchRegistry = async (paths: string[]) => {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/registry/${path}`, {
          // agent, // - TODO: -> Figure out how shadcn uses agent here but it doesn't work for me.
        });
        return await response.json()
      })
    )

    return results;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
};

export const getRegistryIndex = async () => {
  try {
    const [result] = await fetchRegistry(["index.json"])

    return registryIndexSchema.parse(result)
  } catch (error) {
    throw new Error(`Failed to fetch components from registry -> ${error}`,);
  }
};
