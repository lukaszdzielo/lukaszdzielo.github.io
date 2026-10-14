// Treści strony „Strony dla firm” (/strony-dla-firm, po angielsku /business-websites). Ceny są w app/data/pricing.ts.
// Każdy eksport ma wersję { en, pl } o tym samym kształcie – komponenty biorą właściwą przez useLocalized().
// Ikony: klucze z mapy w komponencie BusinessFeatures (lucide).

export const businessHero = {
  en: {
    title: 'A website for your business that',
    accent: 'you edit yourself.',
    lead: 'I design and build one-page and business websites on WordPress – from the first sketch to launch. You get a fast site that looks good on phones, and an editor where you can change a text or a photo without asking me.',
    facts: [
      { value: 'since 2013', text: 'building WordPress sites' },
      { value: '20+', text: 'business websites launched' },
      { value: '3–4 days', text: 'to the first design draft' },
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
    lead: 'No template bought in five minutes and no hundred plugins. Just what your business actually needs online.',
    items: [
      { icon: 'pen', title: 'Designed for your brand', text: 'Design first, code second. You see the site and request changes before it gets built.' },
      { icon: 'blocks', title: 'WordPress block editor', text: 'You edit the content yourself in Gutenberg – no heavy page builder slowing the site down.' },
      { icon: 'phone', title: 'Fast and mobile-friendly', text: 'I design for small screens from the start and don\'t add plugins the site doesn\'t need.' },
      { icon: 'search', title: 'SEO basics included', text: 'Proper headings, page descriptions, a sitemap and business details that Google can read correctly.' },
      { icon: 'server', title: 'Your hosting and domain stay yours', text: 'You buy them in your own name, and I only get access to build and maintain the site. You don\'t depend on me – I help you choose hosting and give you a list of questions for their support team.' },
      { icon: 'chat', title: 'Short training at launch', text: 'After launch, I show you how to add a post, swap a photo and change text – on your own site.' },
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
    lead: 'The “from” prices give you a rough idea. You get the exact price and timeline after a few messages, before we start anything.',
    plans: [
      {
        name: 'One-page site',
        title: 'One page, all about your business',
        text: 'For businesses that want to be visible online and easy for customers to reach.',
        items: ['Sections: about, services, gallery, contact', 'Contact form and directions map', 'Mobile version and SEO basics'],
        price: 'card' as const,
        suffix: '+ VAT',
      },
      {
        name: 'Business website',
        title: 'Several pages and news',
        text: 'For businesses with a wider range of services that want to add content regularly.',
        items: ['Separate pages for services and team', 'Blog / news and custom blocks in the editor', 'Integrations: maps, bookings, social media'],
        price: 'company' as const,
        suffix: '+ VAT',
        highlight: true,
      },
      {
        name: 'Care plan',
        title: 'Peace of mind after launch',
        text: 'For any WordPress site – including ones I didn\'t build.',
        items: ['Monthly updates and backups', 'Uptime monitoring and security', 'Optional hours for small changes'],
        price: 'care' as const,
        suffix: '+ VAT / month',
        more: '#care',
      },
    ],
    other: {
      title: 'A different technology?',
      text: 'I can also build a site in plain HTML, CSS and JS, or a WooCommerce store. For Shopify or PrestaShop, I\'m happy to help after a short consultation.',
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
    lead: 'Some of these projects were made at agencies I worked for. Where a site is no longer live, I link to the project on Behance.',
    items: [
      { path: '/projects/2026/emotion-karting', text: 'Website design for a go-kart track in Bytom – dark and light theme, price list and news.', tags: ['WordPress', 'Gutenberg'], image: '/projects/2026/emotion-karting/page-dark.webp' },
      { path: '/projects/2026/reblyx', text: 'Steel machining center – a new site built entirely in Gutenberg.', tags: ['WordPress', 'Gutenberg'], image: '/projects/2026/reblyx/first-screen.webp' },
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
      { path: '/projects/2026/emotion-karting', text: 'Projekt strony toru kartingowego w Bytomiu – ciemny i jasny motyw, cennik i aktualności.', tags: ['WordPress', 'Gutenberg'], image: '/projects/2026/emotion-karting/page-dark.webp' },
      { path: '/projects/2026/reblyx', text: 'Centrum obróbki stali – nowa strona na pełnym Gutenbergu.', tags: ['WordPress', 'Gutenberg'], image: '/projects/2026/reblyx/first-screen.webp' },
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
    lead: 'You always know what stage we\'re at and what comes next. No disappearing for a month, no surprises on the invoice.',
    steps: [
      { title: 'Message', text: 'Use the form to tell me what your business does and what you need. I reply with questions and examples of sites that suit your industry.', time: 'reply within 72 h' },
      { title: 'Quote and design', text: 'You get a specific price and deadline. Once you accept, I prepare a first design draft and we refine it until it\'s ready.', time: 'design in 3–4 days' },
      { title: 'Build', text: 'We set up the job on Useme or Freelancehunt, freelance platforms that handle the contract and invoice, and I build the site. Meanwhile, you set up hosting – with my list of questions for their support team.', time: 'deadline agreed at the start' },
      { title: 'Launch', text: 'Publishing, SSL certificate, testing on phones and a short editing guide. After that – if you want – the care plan.', time: 'launch day' },
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
    lead: 'Feedback from people I\'ve worked with – published with their permission.',
    items: [
      { text: 'We asked for a website to showcase our car listings. We wanted something easy to edit, without high monthly costs – and that\'s exactly what we got.', name: 'Michał', company: 'Auto Moto Silesia', approved: false },
      { text: 'Thank you so much for the new design! The site looks great, and our Google rankings jumped, which I\'m very grateful for.', name: 'Mateusz', company: 'ReblyX', approved: false },
      { text: 'Łukasz designed and built the Monarca website from scratch. From the start he understood how we wanted to present the company, and he made changes quickly without unnecessary questions.', name: 'Mateusz', company: 'Monarca', approved: false },
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
    title: 'WordPress needs looking after. I can take that on.',
    lead: 'Outdated plugins are the most common cause of WordPress problems. With a care plan, I keep an eye on that for you.',
    monthly: [
      ['Updates', 'of WordPress, plugins and theme – always after a backup'],
      ['Backups', 'stored off the site\'s server'],
      ['Monitoring', '– I know when the site goes down'],
      ['Security', ': two-factor login, limited login attempts'],
      ['Short report', '– on what was done'],
      ['Plan with hours', ': an extra 1–2 h a month for small content and layout changes'],
    ] as CareLine[],
    rules: [
      { label: 'Basic plan', price: 'care' as const, suffix: '+ VAT / month' },
      { label: 'Plan with hours (2 h of changes)', price: 'careHours' as const, suffix: '+ VAT / month' },
      { label: 'Extra hour', price: 'hour' as const, suffix: '+ VAT' },
      { label: 'Unused hours', value: 'don\'t roll over' },
      { label: 'Additional work', value: 'hourly rate' },
      { label: 'Response time', value: 'within 72 hours' },
      { label: 'Minimum term', value: '3 months' },
    ],
    note: 'Fixing a hacked site isn\'t included in the plan – I bill it at my hourly rate. The plan\'s backups usually let me restore a working version quickly.',
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
    title: 'Before you get in touch',
    items: [
      { q: 'How much does a website cost?', a: 'A one-page site starts at {card} + VAT, a business website at {company} + VAT. The exact price depends on the number of pages and features – after a few messages you get a specific quote and timeline.' },
      { q: 'How long does it take?', a: 'The first design draft takes 3–4 days. We agree on the full timeline at the start – it depends on the scope and how quickly the content is ready.' },
      { q: 'Who pays for hosting and the domain?', a: 'You do – you buy them in your own name, so the site always belongs to you. I only need access to launch it and look after it.' },
      { q: 'Can I edit the content myself?', a: 'Yes. The site runs on the WordPress block editor – you change text, photos and posts without any coding.' },
      { q: 'How does payment work?', a: 'Through Useme or Freelancehunt – freelance platforms that handle the contract and invoice. We set up the job on the platform, and you get an invoice for the completed work.' },
      { q: 'I already have a website. Can you improve it?', a: 'Yes – I can take over the care of your existing WordPress site or design a new version of it.' },
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
    lead: 'A business website, landing page, online store or fixes to your current site – a few sentences are enough. I\'ll reply with questions or straight away with a quote.',
    response: 'I reply within 72 hours',
    placeholder: 'E.g. a landing page for a new service with a sign-up form – launching next month…',
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
