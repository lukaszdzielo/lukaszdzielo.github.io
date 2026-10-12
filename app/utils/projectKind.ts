// Rodzaj projektu w archiwum (filtr „WordPress / HTML i CSS / JavaScript / Vue”) wyliczany z tagów.
export type ProjectKind = 'wordpress' | 'html' | 'javascript' | 'vue'

export const projectKindLabels: Record<ProjectKind, string> = {
  wordpress: 'WordPress',
  html: 'HTML i CSS',
  javascript: 'JavaScript',
  vue: 'Vue',
}

export const projectKindOrder: ProjectKind[] = ['wordpress', 'html', 'javascript', 'vue']

export const projectKind = (tags: string[] = []): ProjectKind => {
  const t = tags.map(tag => tag.toLowerCase())
  if (t.includes('wordpress')) return 'wordpress'
  if (t.some(tag => tag === 'vue' || tag === 'nuxt')) return 'vue'
  if (t.some(tag => tag === 'javascript' || tag === 'vanilla-js')) return 'javascript'
  return 'html'
}

export const isProjectKind = (value: unknown): value is ProjectKind =>
  typeof value === 'string' && (projectKindOrder as string[]).includes(value)
