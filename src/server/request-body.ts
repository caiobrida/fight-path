export async function limitedText(
  request: Request,
  limit = 2048,
): Promise<string> {
  if (!request.body) throw new Error("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function limitedJson(
  request: Request,
  limit = 2048,
): Promise<unknown> {
  return JSON.parse(await limitedText(request, limit));
}
