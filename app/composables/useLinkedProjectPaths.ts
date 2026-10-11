// Paths of projects referenced by at least one published blog post (via `project:`).
// A project with linked articles gets its own page even without body content,
// so list cards need this to decide clickability.
export const useLinkedProjectPaths = () => {
  return useAsyncData(
    'blog-linked-project-paths',
    () => queryCollection('blog').where('draft', '=', false).all(),
    {
      transform: (posts) =>
        [...new Set(posts.map(post => post.project).filter((p): p is string => Boolean(p)))],
    },
  );
};
