// Treści strony „Strony dla firm” (/strony-dla-firm). Ceny są w app/data/pricing.ts.
// Ikony: klucze z mapy w komponencie BusinessFeatures (lucide).

export const businessHero = {
  title: 'Strona dla Twojej firmy, którą',
  accent: 'sam edytujesz.',
  lead: 'Projektuję i wdrażam strony wizytówki i strony firmowe na WordPressie – od pierwszego szkicu po publikację. Dostajesz szybką stronę, która dobrze wygląda na telefonie, i edytor, w którym zmienisz tekst czy zdjęcie bez pisania do mnie.',
  facts: [
    { value: 'od 2013', text: 'robię strony na WordPressie' },
    { value: '20+', text: 'wdrożonych stron firmowych' },
    { value: '3–4 dni', text: 'na pierwszy projekt graficzny' },
  ],
}

export const businessFeatures = {
  title: 'Strona, która pracuje na Twoją firmę',
  lead: 'Bez szablonu kupionego w pięć minut i bez stu wtyczek. Tylko to, czego Twoja firma faktycznie potrzebuje w sieci.',
  items: [
    { icon: 'pen', title: 'Projekt pod Twoją markę', text: 'Najpierw projekt graficzny, potem kod. Widzisz stronę i poprawiasz ją, zanim powstanie.' },
    { icon: 'blocks', title: 'Edytor bloków WordPressa', text: 'Treści zmieniasz sam w Gutenbergu – bez ciężkiego page buildera, który spowalnia stronę.' },
    { icon: 'phone', title: 'Szybka i dopasowana do telefonu', text: 'Projektuję od razu na małe ekrany i nie dokładam wtyczek, których strona nie potrzebuje.' },
    { icon: 'search', title: 'Podstawy SEO w cenie', text: 'Poprawne nagłówki, opisy stron, mapa witryny i dane firmy, które dobrze odczyta Google.' },
    { icon: 'server', title: 'Hosting i domena zostają Twoje', text: 'Kupujesz je na siebie, a ja dostaję tylko dostęp do wdrożenia i opieki. Nie jesteś ode mnie uzależniony – pomagam wybrać hosting i daję listę pytań do jego supportu.' },
    { icon: 'chat', title: 'Krótkie szkolenie na start', text: 'Po publikacji pokazuję, jak dodać wpis, podmienić zdjęcie i zmienić tekst – na Twojej stronie.' },
  ],
}

export const businessOffer = {
  title: 'Wybierz, czego potrzebujesz',
  lead: 'Ceny „od” pomagają się zorientować. Dokładną kwotę i termin dostajesz po wymianie kilku wiadomości, zanim cokolwiek zaczniemy.',
  plans: [
    {
      name: 'Wizytówka',
      title: 'Jedna strona, wszystko o firmie',
      text: 'Dla firm, które chcą być widoczne w sieci i łatwo dostępne dla klientów.',
      items: ['Sekcje: o firmie, oferta, galeria, kontakt', 'Formularz kontaktowy i mapa dojazdu', 'Wersja na telefon i podstawy SEO'],
      price: 'card' as const,
      suffix: 'netto',
    },
    {
      name: 'Strona firmowa',
      title: 'Kilka podstron i aktualności',
      text: 'Dla firm z szerszą ofertą, które chcą regularnie dodawać treści.',
      items: ['Osobne podstrony usług i zespołu', 'Blog / aktualności i własne bloki w edytorze', 'Integracje: mapy, rezerwacje, social media'],
      price: 'company' as const,
      suffix: 'netto',
      highlight: true,
    },
    {
      name: 'Opieka',
      title: 'Spokój po publikacji',
      text: 'Dla każdej strony na WordPressie – także takiej, której nie robiłem.',
      items: ['Aktualizacje i kopie zapasowe co miesiąc', 'Monitoring działania i zabezpieczenia', 'Opcjonalnie godziny na drobne zmiany'],
      price: 'care' as const,
      suffix: 'netto / mies.',
      more: '#care',
    },
  ],
  other: {
    title: 'Inna technologia?',
    text: 'Stronę zrobię też w czystym HTML, CSS i JS, a sklep na WooCommerce. Przy Shopify czy PrestaShop chętnie pomogę po krótkiej konsultacji.',
  },
}

// Realizacje: ścieżki projektów z content/projects (tytuł, zdjęcie i linki biorą się stamtąd) + opis i tagi.
// `title` nadpisuje nazwę z archiwum (np. nazwa firmy zamiast nazwy projektu).
export const businessWork = {
  title: 'Strony, które zrobiłem',
  lead: 'Część projektów powstała w agencjach, w których pracowałem. Tam, gdzie strona już nie działa, linkuję do projektu na Behance.',
  items: [
    { path: '/projects/2026/emotion-karting', text: 'Tor kartingowy w Bytomiu – jasny i ciemny motyw, cennik i aktualności.', tags: ['WordPress', 'Gutenberg'] },
    { path: '/projects/2026/reblyx', text: 'Centrum obróbki stali – nowa strona na pełnym Gutenbergu.', tags: ['WordPress', 'Gutenberg'] },
    { path: '/projects/2021/webster-associates', text: 'Strona firmowa (UK) · w agencji b4b.', tags: ['WordPress'] },
    { path: '/projects/2023/soho', title: 'Wyburzenia Polska', text: 'Firma rozbiórkowa · w agencji eConnect4u.', tags: ['WordPress'] },
    { path: '/projects/2021/health-marketing', title: 'Health Marketing', text: 'Strona agencji marketingowej.', tags: ['WordPress', 'Divi'] },
    { path: '/projects/2020/monarca', text: 'Strona firmowa – projekt i wdrożenie.', tags: ['WordPress', 'Divi'] },
  ],
  allLabel: 'Wszystkie moje strony na WordPressie',
  allTo: '/projects?tech=wordpress#archive',
}

export const businessProcess = {
  title: 'Od pierwszej wiadomości do gotowej strony',
  lead: 'Wiesz, na jakim etapie jesteśmy i co dzieje się dalej. Bez znikania na miesiąc i niespodzianek na fakturze.',
  steps: [
    { title: 'Wiadomość', text: 'Piszesz przez formularz, czym się zajmujesz i czego potrzebujesz. Odpisuję z pytaniami i przykładami stron, które pasują do Twojej branży.', time: 'odpowiedź do 72 h' },
    { title: 'Wycena i projekt', text: 'Dostajesz konkretną kwotę i termin. Po akceptacji przygotowuję wstępny projekt graficzny i poprawiamy go, aż będzie gotowy.', time: 'projekt w 3–4 dni' },
    { title: 'Budowa', text: 'Zakładamy zlecenie przez Useme lub Freelancehunt i piszę stronę. Ty w tym czasie zakładasz hosting – z moją listą pytań do supportu.', time: 'termin ustalamy na starcie' },
    { title: 'Start', text: 'Publikacja, certyfikat SSL, test na telefonach i krótka instrukcja edycji. Potem – jeśli chcesz – opieka.', time: 'dzień publikacji' },
  ],
}

// Opinie pokazujemy dopiero po akceptacji klienta (`approved: true`). Bez zaakceptowanych sekcja się nie wyświetla.
export const businessQuotes = {
  title: 'Kilka słów od klientów',
  lead: 'Opinie osób, z którymi pracowałem – publikowane za ich zgodą.',
  items: [
    { text: 'Prosiliśmy o stronę, na której będziemy prezentować nasze oferty samochodów. Chcieliśmy czegoś prostego w edycji, bez dużych kosztów miesięcznych – i dokładnie to dostaliśmy.', name: 'Michał', company: 'Auto Moto Silesia', approved: false },
    { text: 'Bardzo dziękuję za nowy projekt! Strona wygląda świetnie, a wyniki w Google podskoczyły, za co jestem bardzo wdzięczny.', name: 'Mateusz', company: 'ReblyX', approved: false },
    { text: 'Łukasz zaprojektował i wdrożył stronę Monarki od zera. Od początku rozumiał, jak chcemy pokazać firmę, a poprawki wprowadzał szybko i bez zbędnych pytań.', name: 'Mateusz', company: 'Monarca', approved: false },
  ],
}

export const businessCare = {
  title: 'WordPress wymaga opieki. Mogę ją przejąć.',
  lead: 'Nieaktualne wtyczki to najczęstszy powód problemów z WordPressem. W abonamencie pilnuję tego za Ciebie.',
  monthly: [
    ['Aktualizacje', 'WordPressa, wtyczek i motywu – zawsze po zrobieniu kopii'],
    ['Kopie zapasowe', 'trzymane poza serwerem strony'],
    ['Monitoring', '– wiem, gdy strona przestaje działać'],
    ['Zabezpieczenia', ': logowanie dwuetapowe, limit prób logowania'],
    ['Krótki raport', '– co zostało zrobione'],
    ['Pakiet z godzinami', ': dodatkowo 1–2 h w miesiącu na drobne zmiany treści i układu'],
  ] as const,
  rules: [
    { label: 'Pakiet podstawowy', price: 'care' as const, suffix: 'netto / mies.' },
    { label: 'Pakiet z godzinami (2 h zmian)', price: 'careHours' as const, suffix: 'netto / mies.' },
    { label: 'Dodatkowa godzina', price: 'hour' as const, suffix: 'netto' },
    { label: 'Niewykorzystane godziny', value: 'nie przechodzą dalej' },
    { label: 'Dodatkowe prace', value: 'stawka godzinowa' },
    { label: 'Czas reakcji', value: 'do 72 godzin' },
    { label: 'Minimalny okres', value: '3 miesiące' },
  ],
  note: 'Naprawa strony po włamaniu nie wchodzi w abonament – rozliczam ją według stawki godzinowej. Kopie zapasowe z abonamentu zwykle pozwalają szybko przywrócić działającą wersję.',
}

export const businessFaq = {
  title: 'Zanim napiszesz',
  items: [
    { q: 'Ile kosztuje strona?', a: 'Wizytówka od {card} netto, strona firmowa od {company} netto. Dokładna kwota zależy od liczby podstron i funkcji – po kilku wiadomościach dostajesz konkretną wycenę i termin.' },
    { q: 'Ile to trwa?', a: 'Pierwszy projekt graficzny w 3–4 dni. Termin całości ustalamy na starcie – zależy od zakresu i tego, jak szybko mamy treści.' },
    { q: 'Kto płaci za hosting i domenę?', a: 'Ty – kupujesz je na siebie, więc strona zawsze należy do Ciebie. Ja potrzebuję tylko dostępu, żeby ją wdrożyć i się nią opiekować.' },
    { q: 'Czy sam zmienię treści?', a: 'Tak. Strona działa na edytorze bloków WordPressa – tekst, zdjęcia i wpisy zmieniasz bez kodowania.' },
    { q: 'Jak wygląda rozliczenie?', a: 'Przez Useme lub Freelancehunt – zlecenie zakładamy na platformie, a Ty dostajesz fakturę za wykonaną pracę.' },
    { q: 'Mam już stronę. Możesz ją poprawić?', a: 'Tak – mogę przejąć opiekę nad istniejącym WordPressem albo zaprojektować jego nową wersję.' },
  ],
}

export const businessContact = {
  title: 'Napisz, czego potrzebujesz.',
  lead: 'Strona firmowa, landing, sklep albo poprawki w istniejącej stronie – kilka zdań wystarczy. Odpiszę z pytaniami albo od razu z wyceną.',
  response: 'Odpowiadam w ciągu 72 godzin',
  placeholder: 'Np. landing nowej usługi z formularzem zapisu – start w przyszłym miesiącu…',
  topics: [
    { value: 'Wizytówka', label: 'Wizytówka' },
    { value: 'Strona firmowa', label: 'Strona firmowa' },
    { value: 'Landing', label: 'Landing' },
    { value: 'Sklep', label: 'Sklep' },
    { value: 'Opieka', label: 'Opieka' },
    { value: 'Jeszcze nie wiem', label: 'Jeszcze nie wiem' },
  ],
}

// Menu na stronie dla firm (kotwice po angielsku)
export const businessMenu = [
  { label: 'Oferta', to: '/strony-dla-firm#offer' },
  { label: 'Realizacje', to: '/strony-dla-firm#projects' },
  { label: 'Jak pracuję', to: '/strony-dla-firm#process' },
  { label: 'Opieka', to: '/strony-dla-firm#care' },
  { label: 'FAQ', to: '/strony-dla-firm#faq' },
]
