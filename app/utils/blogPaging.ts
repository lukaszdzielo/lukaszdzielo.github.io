// Podział wpisów na strony: na pierwszej 13 (1 wyróżniony + 4 rzędy po 3), na kolejnych po 12.
export const BLOG_FIRST_PAGE = 13
export const BLOG_PER_PAGE = 12

export const blogPageCount = (total: number) =>
  1 + Math.ceil(Math.max(0, total - BLOG_FIRST_PAGE) / BLOG_PER_PAGE)

export const blogSkip = (page: number) => (page === 1 ? 0 : BLOG_FIRST_PAGE + (page - 2) * BLOG_PER_PAGE)

export const blogLimit = (page: number) => (page === 1 ? BLOG_FIRST_PAGE : BLOG_PER_PAGE)

export const blogPagePath = (page: number) => (page === 1 ? '/blog' : `/blog/page/${page}`)
