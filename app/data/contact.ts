// Ustawienia formularza kontaktowego (Web3Forms).
// Klucz dostępu Web3Forms jest publiczny z założenia – może być w kodzie strony.
// Adres, na który przychodzą wiadomości, ustawiasz w panelu Web3Forms, nie tutaj.
// Ochrona przed spamem: captcha wyłączona (Captcha Protection: None), Advanced Spam Filter: Basic + pole-pułapka w formularzu.
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
export const WEB3FORMS_ACCESS_KEY = 'dac37178-9e51-46a2-bd27-354d00b005b2'

// Opcje pola „W sprawie”. `value` trafia do maila, `label` widzi użytkownik.
export const contactTopics = [
  { value: 'Praca w zespole', label: 'Praca w zespole' },
  { value: 'Projekt w Vue', label: 'Projekt w Vue' },
  { value: 'Strona dla firmy', label: 'Strona dla firmy' },
  { value: 'Inne', label: 'Inne' },
] as const

export const contactSocials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lukasz-dzielo-0428b4148/' },
  { label: 'GitHub', href: 'https://github.com/lukaszdzielo' },
  { label: 'Instagram', href: 'https://www.instagram.com/lukasz.dev' },
] as const
