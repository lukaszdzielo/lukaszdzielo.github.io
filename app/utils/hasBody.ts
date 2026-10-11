type ContentDoc = { body?: { value?: unknown[] } | null } | null | undefined;

export const hasBody = (doc: ContentDoc): boolean => {
  const value = doc?.body?.value;
  return Array.isArray(value) && value.length > 0;
};
