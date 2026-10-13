// Treści strony „Strony dla firm” (/strony-dla-firm, po angielsku /business-websites). Ceny są w app/data/pricing.ts.
// Każdy eksport ma wersję { en, pl } o tym samym kształcie – komponenty biorą właściwą przez useLocalized().
// Ikony: klucze z mapy w komponencie BusinessFeatures (lucide).

export const businessHero = {
  en: {
    title: 'A website for your business that',
    accent: 'you edit yourself.',
    lead: 'I design and build one-page sites and business websites on WordPress – from the first sketch to the launch. You get a fast site that looks good on phones. In the editor, you can change texts and photos yourself, without my help.',
    facts: [
      { value: 'since 2013', text: 'building WordPress sites' },
      { value: '20+', text: 'business websites launched' },
      { value: '3–4 days', text: 'for the first design' },
    ],
  },
  pl: {
    title: 'Strona dla Twojej firmy, którą',
    accent: 'sam edytujesz.',
    lead: 'Projektuję i wdrażam strony wizytówki i strony firmowe na WordPressie – od pierwszego szkicu po publikację. Dostajesz szybką stronę, która dobrze wygląda na telefonie, i edytor, w którym zmienisz tekst czy zdjęcie bez pisania do mnie.',
    facts: [
      { value: 'od 2013', text: 'robię strony na WordPressie' },
      { value: '20+', text: 'wdrożonych stron firmowych' },
      { value: '3–4 dni', text: 'na pierwszy projekt graficzny' },
    ],
  },
}

export const businessFeatures = {
  en: {
    title: 'A website that works for your business',
    lead: 'No template bought in five minutes and no hundred plugins. Only what your business really needs online.',
    items: [
      { icon: 'pen', title: 'A design for your brand', text: 'First the design, then the code. You see the site and ask for changes before I build it.' },
      { icon: 'blocks', title: 'WordPress block editor', text: 'You change the content yourself in Gutenberg – without a heavy page builder that slows the site down.' },
      { icon: 'phone', title: 'Fast and good on phones', text: 'I design for small screens from the start. I don\'t add plugins that the site doesn\'t need.' },
      { icon: 'search', title: 'SEO basics included', text: 'Correct headings, page descriptions, a sitemap and business details that Google can read well.' },
      { icon: 'server', title: 'Your hosting and domain stay yours', text: 'You buy them in your own name. I only get access to build the site and look after it. You don\'t depend on me – I help you choose hosting and give you a list of questions for their support team.' },
      { icon: 'chat', title: 'Short training at the start', text: 'After the launch, I show you how to add a post, change a photo and edit a text – on your own site.' },
    ],
  },
  pl: {
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
  },
}

export const businessOffer = {
  en: {
    title: 'Choose what you need',
    lead: 'The “from” prices give you a general idea. You get the exact price and deadline after a few messages, before we start any work.',
    plans: [
      {
        name: 'One-page site',
        title: 'One page, all about your business',
        text: 'For businesses that want to be visible online and easy to reach for clients.',
        items: ['Sections: about, services, gallery, contact', 'Contact form and a map with directions', 'Mobile version and SEO basics'],
        price: 'card' as const,
        suffix: '+ VAT',
      },
      {
        name: 'Business website',
        title: 'Several pages and news',
        text: 'For businesses with more services that want to add new content regularly.',
        items: ['Separate pages for services and the team', 'Blog / news and custom blocks in the editor', 'Integrations: maps, bookings, social media'],
        price: 'company' as const,
        suffix: '+ VAT',
        highlight: true,
      },
      {
        name: 'Care plan',
        title: 'No stress after the launch',
        text: 'For any WordPress site – also for sites I didn\'t build.',
        items: ['Updates and backups every month', 'Site monitoring and security', 'Optional hours for small changes'],
        price: 'care' as const,
        suffix: '+ VAT / month',
        more: '#care',
      },
    ],
    other: {
      title: 'A different technology?',
      text: 'I can also build a site in plain HTML, CSS and JS, or an online store on WooCommerce. With Shopify or PrestaShop, I am happy to help after a short consultation.',
    },
  },
  pl: {
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
  },
}

// Realizacje: ścieżki projektów z content/projects (tytuł, zdjęcie i linki biorą się stamtąd) + opis i tagi.
// `title` nadpisuje nazwę z archiwum (np. nazwa firmy zamiast nazwy projektu).
// Ścieżki i `allTo` – adresy wersji polskiej bez /pl (komponent zamienia je na adres w bieżącym języku).
export const businessWork = {
  en: {
    title: 'Websites I\'ve built',
    lead: 'I made some of these projects at agencies where I worked. If a site is no longer online, I link to the project on Behance.',
    items: [
      { path: '/projects/2026/emotion-karting', text: 'Go-kart track in Bytom – light and dark theme, price list and news.', tags: ['WordPress', 'Gutenberg'], image: '/featured/emotion-karting.webp', imageDark: '/featured/emotion-karting-dark.webp' },
      { path: '/projects/2026/reblyx', text: 'Steel machining center – a new site built fully in Gutenberg.', tags: ['WordPress', 'Gutenberg'], image: '/featured/reblyx.webp' },
      { path: '/projects/2021/webster-associates', text: 'Business website (UK) · at the b4b agency.', tags: ['WordPress'] },
      { path: '/projects/2023/soho', title: 'Wyburzenia Polska', text: 'Demolition company · at the eConnect4u agency.', tags: ['WordPress'] },
      { path: '/projects/2021/health-marketing', title: 'Health Marketing', text: 'Website for a marketing agency.', tags: ['WordPress', 'Divi'] },
      { path: '/projects/2020/monarca', text: 'Business website – design and build.', tags: ['WordPress', 'Divi'] },
    ],
    allLabel: 'All my WordPress websites',
    allTo: '/projects?tech=wordpress#archive',
  },
  pl: {
    title: 'Strony, które zrobiłem',
    lead: 'Część projektów powstała w agencjach, w których pracowałem. Tam, gdzie strona już nie działa, linkuję do projektu na Behance.',
    items: [
      { path: '/projects/2026/emotion-karting', text: 'Tor kartingowy w Bytomiu – jasny i ciemny motyw, cennik i aktualności.', tags: ['WordPress', 'Gutenberg'], image: '/featured/emotion-karting.webp', imageDark: '/featured/emotion-karting-dark.webp' },
      { path: '/projects/2026/reblyx', text: 'Centrum obróbki stali – nowa strona na pełnym Gutenbergu.', tags: ['WordPress', 'Gutenberg'], image: '/featured/reblyx.webp' },
      { path: '/projects/2021/webster-associates', text: 'Strona firmowa (UK) · w agencji b4b.', tags: ['WordPress'] },
      { path: '/projects/2023/soho', title: 'Wyburzenia Polska', text: 'Firma rozbiórkowa · w agencji eConnect4u.', tags: ['WordPress'] },
      { path: '/projects/2021/health-marketing', title: 'Health Marketing', text: 'Strona agencji marketingowej.', tags: ['WordPress', 'Divi'] },
      { path: '/projects/2020/monarca', text: 'Strona firmowa – projekt i wdrożenie.', tags: ['WordPress', 'Divi'] },
    ],
    allLabel: 'Wszystkie moje strony na WordPressie',
    allTo: '/projects?tech=wordpress#archive',
  },
}

export const businessProcess = {
  en: {
    title: 'From the first message to a finished website',
    lead: 'You know what stage we are at and what happens next. I don\'t disappear for a month, and there are no surprises on the invoice.',
    steps: [
      { title: 'Message', text: 'Use the form to tell me what your business does and what you need. I reply with questions and examples of sites that fit your industry.', time: 'reply within 72 h' },
      { title: 'Quote and design', text: 'You get a specific price and deadline. When you accept them, I prepare a first design. We change it until it is ready.', time: 'design in 3–4 days' },
      { title: 'Build', text: 'We sign the contract on Useme or Freelancehunt. These platforms handle the contract and the invoice. Then I build the site. At the same time, you set up hosting – with my list of questions for their support team.', time: 'we agree on the deadline at the start' },
      { title: 'Launch', text: 'Publishing, an SSL certificate, tests on phones and a short guide to editing. After that – if you want – the care plan.', time: 'launch day' },
    ],
  },
  pl: {
    title: 'Od pierwszej wiadomości do gotowej strony',
    lead: 'Wiesz, na jakim etapie jesteśmy i co dzieje się dalej. Bez znikania na miesiąc i niespodzianek na fakturze.',
    steps: [
      { title: 'Wiadomość', text: 'Piszesz przez formularz, czym się zajmujesz i czego potrzebujesz. Odpisuję z pytaniami i przykładami stron, które pasują do Twojej branży.', time: 'odpowiedź do 72 h' },
      { title: 'Wycena i projekt', text: 'Dostajesz konkretną kwotę i termin. Po akceptacji przygotowuję wstępny projekt graficzny i poprawiamy go, aż będzie gotowy.', time: 'projekt w 3–4 dni' },
      { title: 'Budowa', text: 'Zakładamy zlecenie przez Useme lub Freelancehunt i piszę stronę. Ty w tym czasie zakładasz hosting – z moją listą pytań do supportu.', time: 'termin ustalamy na starcie' },
      { title: 'Start', text: 'Publikacja, certyfikat SSL, test na telefonach i krótka instrukcja edycji. Potem – jeśli chcesz – opieka.', time: 'dzień publikacji' },
    ],
  },
}

// Opinie pokazujemy dopiero po akceptacji klienta (`approved: true`). Bez zaakceptowanych sekcja się nie wyświetla.
// Wersja angielska to tłumaczenie opinii – `approved` ustawiaj tak samo w obu językach.
export const businessQuotes = {
  en: {
    title: 'A few words from clients',
    lead: 'Opinions from people I have worked with – I publish them with their permission.',
    items: [
      { text: 'We asked for a website to show our car offers. We wanted something easy to edit, without high monthly costs – and that is exactly what we got.', name: 'Michał', company: 'Auto Moto Silesia', approved: false },
      { text: 'Thank you very much for the new design! The site looks great, and our results in Google went up a lot. I am very grateful for that.', name: 'Mateusz', company: 'ReblyX', approved: false },
      { text: 'Łukasz designed and built the whole Monarca website, starting from zero. From the beginning, he understood how we wanted to show the company. He made changes quickly and without unnecessary questions.', name: 'Mateusz', company: 'Monarca', approved: false },
    ],
  },
  pl: {
    title: 'Kilka słów od klientów',
    lead: 'Opinie osób, z którymi pracowałem – publikowane za ich zgodą.',
    items: [
      { text: 'Prosiliśmy o stronę, na której będziemy prezentować nasze oferty samochodów. Chcieliśmy czegoś prostego w edycji, bez dużych kosztów miesięcznych – i dokładnie to dostaliśmy.', name: 'Michał', company: 'Auto Moto Silesia', approved: false },
      { text: 'Bardzo dziękuję za nowy projekt! Strona wygląda świetnie, a wyniki w Google podskoczyły, za co jestem bardzo wdzięczny.', name: 'Mateusz', company: 'ReblyX', approved: false },
      { text: 'Łukasz zaprojektował i wdrożył stronę Monarki od zera. Od początku rozumiał, jak chcemy pokazać firmę, a poprawki wprowadzał szybko i bez zbędnych pytań.', name: 'Mateusz', company: 'Monarca', approved: false },
    ],
  },
}

// Punkt listy „W każdym miesiącu”: [pogrubiony początek, reszta zdania]. Reszta zaczynająca się od „:” dokleja się bez spacji.
type CareLine = readonly [string, string]

export const businessCare = {
  en: {
    title: 'WordPress needs regular care. I can do it for you.',
    lead: 'Old plugins are the most common cause of problems with WordPress. In the care plan, I check this for you.',
    monthly: [
      ['Updates', 'of WordPress, plugins and theme – always after a backup'],
      ['Backups', 'stored outside the site\'s server'],
      ['Monitoring', '– I know when the site stops working'],
      ['Security', ': two-factor login, a limit on login attempts'],
      ['Short report', '– about what I did'],
      ['Plan with hours', ': an extra 1–2 h a month for small changes to content and layout'],
    ] as CareLine[],
    rules: [
      { label: 'Basic plan', price: 'care' as const, suffix: '+ VAT / month' },
      { label: 'Plan with hours (2 h of changes)', price: 'careHours' as const, suffix: '+ VAT / month' },
      { label: 'Extra hour', price: 'hour' as const, suffix: '+ VAT' },
      { label: 'Unused hours', value: 'don\'t move to the next month' },
      { label: 'Extra work', value: 'hourly rate' },
      { label: 'Response time', value: 'within 72 hours' },
      { label: 'Minimum period', value: '3 months' },
    ],
    note: 'Fixing a site after a hack is not part of the plan – I charge my hourly rate for it. The backups from the plan usually help me bring back a working version quickly.',
  },
  pl: {
    title: 'WordPress wymaga opieki. Mogę ją przejąć.',
    lead: 'Nieaktualne wtyczki to najczęstszy powód problemów z WordPressem. W abonamencie pilnuję tego za Ciebie.',
    monthly: [
      ['Aktualizacje', 'WordPressa, wtyczek i motywu – zawsze po zrobieniu kopii'],
      ['Kopie zapasowe', 'trzymane poza serwerem strony'],
      ['Monitoring', '– wiem, gdy strona przestaje działać'],
      ['Zabezpieczenia', ': logowanie dwuetapowe, limit prób logowania'],
      ['Krótki raport', '– co zostało zrobione'],
      ['Pakiet z godzinami', ': dodatkowo 1–2 h w miesiącu na drobne zmiany treści i układu'],
    ] as CareLine[],
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
  },
}

// {card}, {company} – miejsca na ceny z app/data/pricing.ts (wstawiane w komponencie, w formacie danego języka)
export const businessFaq = {
  en: {
    title: 'Before you write to me',
    items: [
      { q: 'How much does a website cost?', a: 'A one-page site starts at {card} + VAT. A business website starts at {company} + VAT. The exact price depends on the number of pages and features – after a few messages, you get a specific quote and deadline.' },
      { q: 'How long does it take?', a: 'The first design takes 3–4 days. We agree on the deadline for the whole site at the start – it depends on the scope and on how fast the content is ready.' },
      { q: 'Who pays for hosting and the domain?', a: 'You do – you buy them in your own name, so the site always belongs to you. I only need access to launch the site and look after it.' },
      { q: 'Can I change the content myself?', a: 'Yes. The site uses the WordPress block editor – you change texts, photos and posts without any code.' },
      { q: 'How does payment work?', a: 'We sign the contract on Useme or Freelancehunt. These platforms handle the contract and the invoice. You get an invoice for the finished work.' },
      { q: 'I already have a website. Can you improve it?', a: 'Yes – I can take care of your current WordPress site or design a new version of it.' },
    ],
  },
  pl: {
    title: 'Zanim napiszesz',
    items: [
      { q: 'Ile kosztuje strona?', a: 'Wizytówka od {card} netto, strona firmowa od {company} netto. Dokładna kwota zależy od liczby podstron i funkcji – po kilku wiadomościach dostajesz konkretną wycenę i termin.' },
      { q: 'Ile to trwa?', a: 'Pierwszy projekt graficzny w 3–4 dni. Termin całości ustalamy na starcie – zależy od zakresu i tego, jak szybko mamy treści.' },
      { q: 'Kto płaci za hosting i domenę?', a: 'Ty – kupujesz je na siebie, więc strona zawsze należy do Ciebie. Ja potrzebuję tylko dostępu, żeby ją wdrożyć i się nią opiekować.' },
      { q: 'Czy sam zmienię treści?', a: 'Tak. Strona działa na edytorze bloków WordPressa – tekst, zdjęcia i wpisy zmieniasz bez kodowania.' },
      { q: 'Jak wygląda rozliczenie?', a: 'Przez Useme lub Freelancehunt – zlecenie zakładamy na platformie, a Ty dostajesz fakturę za wykonaną pracę.' },
      { q: 'Mam już stronę. Możesz ją poprawić?', a: 'Tak – mogę przejąć opiekę nad istniejącym WordPressem albo zaprojektować jego nową wersję.' },
    ],
  },
}

// Formularz kontaktowy na stronie dla firm (używa go app/components/sections/HomeContact.vue, wariant „business”).
// `value` trafia do maila – zostaje po polsku w obu językach, żeby wiadomości w skrzynce wyglądały tak samo; `label` widzi użytkownik.
export const businessContact = {
  en: {
    title: 'Tell me what you need.',
    lead: 'A business website, a landing page, an online store or fixes on your current site – a few sentences are enough. I reply with questions or with a quote right away.',
    response: 'I reply within 72 hours',
    placeholder: 'E.g. a landing page for a new service with a sign-up form – start next month…',
    topics: [
      { value: 'Wizytówka', label: 'One-page site' },
      { value: 'Strona firmowa', label: 'Business website' },
      { value: 'Landing', label: 'Landing page' },
      { value: 'Sklep', label: 'Online store' },
      { value: 'Opieka', label: 'Care plan' },
      { value: 'Jeszcze nie wiem', label: 'Not sure yet' },
    ],
  },
  pl: {
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
  },
}

// Menu na stronie dla firm (kotwice po angielsku; link() z useLocalLink zamienia adres na wersję językową)
export const businessMenu = {
  en: [
    { label: 'Offer', to: '/strony-dla-firm#offer' },
    { label: 'Work', to: '/strony-dla-firm#projects' },
    { label: 'Process', to: '/strony-dla-firm#process' },
    { label: 'Care', to: '/strony-dla-firm#care' },
    { label: 'FAQ', to: '/strony-dla-firm#faq' },
  ],
  pl: [
    { label: 'Oferta', to: '/strony-dla-firm#offer' },
    { label: 'Realizacje', to: '/strony-dla-firm#projects' },
    { label: 'Jak pracuję', to: '/strony-dla-firm#process' },
    { label: 'Opieka', to: '/strony-dla-firm#care' },
    { label: 'FAQ', to: '/strony-dla-firm#faq' },
  ],
}
