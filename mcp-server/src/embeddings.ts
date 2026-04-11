import { config } from "./config.js";

const EMBEDDING_DIMENSIONS = 1536;

/**
 * Generate an embedding vector for the given text using Azure OpenAI's API.
 * Returns a float array of length 1536.
 */
export async function embed(text: string): Promise<number[]> {
  // Truncate to ~8000 tokens worth of text (~32K chars) to stay within model limits
  const truncated = text.slice(0, 32_000);

  const url = `${config.azureOpenaiEndpoint}/openai/deployments/${config.azureOpenaiDeployment}/embeddings?api-version=${config.azureOpenaiApiVersion}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": config.azureOpenaiApiKey,
    },
    body: JSON.stringify({
      input: truncated,
      dimensions: EMBEDDING_DIMENSIONS,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Azure OpenAI embedding failed (${res.status}): ${body}`);
  }

  const json = (await res.json()) as {
    data: Array<{ embedding: number[] }>;
  };

  return json.data[0].embedding;
}

/**
 * Format a page's content for embedding: title + summary + body.
 */
export function embeddingText(
  title: string,
  summary: string | null,
  body: string
): string {
  const parts = [title];
  if (summary) parts.push(summary);
  parts.push(body);
  return parts.join("\n\n");
}
