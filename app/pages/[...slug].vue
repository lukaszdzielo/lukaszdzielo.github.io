<script setup lang="ts">
import { PERSON_ID, PROFILES, SITE_NAME, SITE_URL } from '~/data/site'

const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
	return queryCollection('content').path(route.path).first()
})

// Strona główna: kim jestem (Person) i czym jest strona (WebSite) – dla Google i wyszukiwarek AI
if (route.path === '/') {
	useJsonLd('home', {
		'@graph': [
			{
				'@type': 'Person',
				'@id': PERSON_ID,
				name: SITE_NAME,
				jobTitle: 'Front-End Developer',
				url: `${SITE_URL}/`,
				image: `${SITE_URL}/og/og-cover.jpg`,
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
				inLanguage: 'pl-PL',
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
