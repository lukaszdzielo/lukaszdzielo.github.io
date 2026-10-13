<script setup lang="ts">
import { PERSON_ID, PROFILES, SITE_NAME, SITE_URL } from '~/data/site'

const route = useRoute()
const { col, clean, withoutLocale, lang } = useContentLocale()
const path = clean(route.path)
const { t } = useI18n({ useScope: 'local' })

const { data: page } = await useAsyncData('page-' + path, () => {
	return queryCollection(col('content')).path(path).first()
})

// Strona główna: tytuł, opis i obrazek podglądu w języku strony (pozostałe podstrony robią to same)
if (withoutLocale(path) === '/') {
	useSiteMeta({
		title: t('meta.title'),
		description: t('meta.description'),
		image: `/og/home-${lang.value}.jpg`,
		imageAlt: t('meta.imageAlt'),
	})
}

// Strona główna: kim jestem (Person) i czym jest strona (WebSite) – dla Google i wyszukiwarek AI
if (withoutLocale(path) === '/') {
	useJsonLd('home', {
		'@graph': [
			{
				'@type': 'Person',
				'@id': PERSON_ID,
				name: SITE_NAME,
				jobTitle: 'Front-End Developer',
				url: `${SITE_URL}/`,
				image: `${SITE_URL}/og/home-${lang.value}.jpg`,
				sameAs: Object.values(PROFILES),
				knowsAbout: ['Vue.js', 'Nuxt', 'JavaScript', 'Tailwind CSS', 'Inertia.js', 'PrimeVue', 'WordPress', 'Gutenberg'],
				worksFor: { '@type': 'Organization', name: 'Pesi' },
				address: { '@type': 'PostalAddress', addressLocality: 'Katowice', addressCountry: 'PL' },
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: `${SITE_URL}/`,
				name: `${SITE_NAME} – Front-End Developer`,
				inLanguage: lang.value === 'pl' ? 'pl-PL' : 'en-US',
				publisher: { '@id': PERSON_ID },
			},
		],
	})
}
</script>

<template>
	<ContentRenderer v-if="page" :value="page" />

	<CommonNotFound v-else />
</template>

<i18n lang="json">
{
	"en": {
		"meta": {
			"title": "Łukasz Dzieło – Front-End Developer",
			"description": "Front-End Developer. I build responsive interfaces in Vue 3 – reusable components, state and API integrations. I also build WordPress websites for businesses.",
			"imageAlt": "Łukasz Dzieło – Front-End Developer"
		}
	},
	"pl": {
		"meta": {
			"title": "Łukasz Dzieło – Front-End Developer",
			"description": "Front-End Developer. Buduję responsywne interfejsy w Vue 3 – komponenty wielokrotnego użytku, stan i integracje z API. Robię też strony WordPress dla firm.",
			"imageAlt": "Łukasz Dzieło – Front-End Developer"
		}
	}
}
</i18n>
