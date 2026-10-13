// Linki wewnętrzne w aktualnym języku. W kodzie i danych piszemy adresy wersji polskiej bez /pl
// ('/strony-dla-firm#contact', '/#projects', '/projects?tech=wordpress#archive'),
// a link() zamienia je na adres w bieżącym języku (np. '/business-websites#contact' albo '/pl/strony-dla-firm#contact').
// Podstrony z innym adresem w każdym języku – po nazwie trasy (definePageMeta({ i18n: { paths } })).
const NAMED: Record<string, string> = {
  '/strony-dla-firm': 'strony-dla-firm',
  '/polityka-prywatnosci': 'polityka-prywatnosci',
}

export function useLocalLink() {
  const localePath = useLocalePath()
  return (to: string) => {
    const [beforeHash, hash] = to.split('#')
    const [path = '/', search] = (beforeHash ?? '/').split('?')
    const query = search ? Object.fromEntries(new URLSearchParams(search)) : undefined
    const name = NAMED[path.replace(/\/$/, '') || '/']
    const target = name
      ? localePath({ name, query, hash: hash ? `#${hash}` : undefined })
      : localePath({ path: path || '/', query, hash: hash ? `#${hash}` : undefined })
    return target || to
  }
}
