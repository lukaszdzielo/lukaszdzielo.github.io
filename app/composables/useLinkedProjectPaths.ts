// Paths of projects referenced by at least one published blog post (via `project:`).
// A project with linked articles gets its own page even without body content,
// so list cards need this to decide clickability.
// Ścieżki bez przedrostka języka (tak jak w polu `project:` wpisu), np. '/projects/2024/pokedex'.
export const useLinkedProjectPaths = () => {
  const { col, lang } = useContentLocale()
  return useAsyncData(
    `blog-linked-project-paths-${lang.value}`,
    () => queryCollection(col('blog')).where('draft', '=', false).all(),
    {
      transform: (posts) =>
        [...new Set(posts.map(post => post.project).filter((p): p is string => Boolean(p)))],
    },
  );
};
