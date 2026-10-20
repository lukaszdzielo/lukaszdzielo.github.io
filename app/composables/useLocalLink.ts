// Linki wewnętrzne w aktualnym języku. W kodzie i danych piszemy adresy bez /pl
// ('/strony-dla-firm#contact', '/#projects', '/projects?tech=wordpress#archive'),
// a link() zamienia je na adres w bieżącym języku (np. '/business-websites#contact' albo '/pl/strony-dla-firm#contact').
// Części adresu i kotwice z polską nazwą (/projects → /projekty, #contact → #kontakt) – app/utils/localeRoutes.ts.
// Podstrony z innym adresem w każdym języku – po nazwie trasy (definePageMeta({ i18n: { paths } })).
const NAMED: Record<string, string> = {
  '/strony-dla-firm': 'strony-dla-firm',
  '/polityka-prywatnosci': 'polityka-prywatnosci',
}

export function useLocalLink() {
  const localePath = useLocalePath()
  // globalny język aplikacji (useI18n() w komponencie z blokiem <i18n> zwróciłby zakres lokalny)
  const locale = useNuxtApp().$i18n.locale
  return (to: string) => {
    const [beforeHash, rawHash] = to.split('#')
    const hash = rawHash && locale.value === 'pl' ? toPlAnchor(rawHash) : rawHash
    const [path = '/', search] = (beforeHash ?? '/').split('?')
    const query = search ? Object.fromEntries(new URLSearchParams(search)) : undefined
    const name = NAMED[path.replace(/\/$/, '') || '/']
    const target = name
      ? localePath({ name, query, hash: hash ? `#${hash}` : undefined })
      : localePath({ path: locale.value === 'pl' ? toPlPath(path || '/') : path || '/', query, hash: hash ? `#${hash}` : undefined })
    return target || to
  }
}
