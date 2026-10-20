<script setup lang="ts">
// Udostępnianie wpisu bez zewnętrznych skryptów: zwykłe linki do LinkedIn, X i Facebooka,
// kopiowanie adresu, a na urządzeniach, które to obsługują (głównie telefony) – systemowe okno udostępniania (Web Share API).
const props = defineProps<{ url: string; title: string }>()

const { t } = useI18n({ useScope: 'local' })
const copied = ref(false)
const canShare = ref(false)
onMounted(() => {
  canShare.value = 'share' in navigator
})

const enc = encodeURIComponent
const links = computed(() => [
  { label: 'LinkedIn', icon: 'lucide:linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(props.url)}` },
  { label: 'X', icon: 'lucide:twitter', href: `https://x.com/intent/post?url=${enc(props.url)}&text=${enc(props.title)}` },
  { label: 'Facebook', icon: 'lucide:facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(props.url)}` },
])

let timer: ReturnType<typeof setTimeout> | undefined
// Clipboard API działa tylko na https i localhost – pod adresem z sieci lokalnej (http://192.168…) go nie ma,
// więc wtedy kopiujemy starszym sposobem: ukryte pole tekstowe + execCommand('copy')
function copyFallback(text: string) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.append(area)
  area.select()
  const ok = document.execCommand('copy')
  area.remove()
  return ok
}

async function copy() {
  let ok = false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(props.url)
      ok = true
    } else {
      ok = copyFallback(props.url)
    }
  } catch {
    ok = copyFallback(props.url)
  }
  if (!ok) return
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2000)
}

async function share() {
  try {
    await navigator.share({ title: props.title, url: props.url })
  } catch {
    // zamknięte okno udostępniania – to nie błąd
  }
}

const btn =
  'inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full border border-slate-900/12 px-3 text-sm font-medium text-slate-700 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/15 dark:text-slate-200 dark:hover:border-primary-400 dark:hover:text-primary-400'
</script>

<template>
  <div>
    <h2 class="text-xs font-semibold tracking-widest text-slate-600 uppercase dark:text-slate-400">{{ t('title') }}</h2>
    <ul class="mt-4 flex flex-wrap gap-2">
      <li v-if="canShare">
        <button type="button" :class="btn" @click="share">
          <Icon name="lucide:share-2" class="size-4" aria-hidden="true" />
          {{ t('share') }}
        </button>
      </li>
      <li v-for="link in links" :key="link.label">
        <a :href="link.href" target="_blank" rel="noopener noreferrer" :class="btn" :aria-label="t('on', { name: link.label })">
          <Icon :name="link.icon" class="size-4" aria-hidden="true" />
        </a>
      </li>
      <li>
        <button type="button" :class="btn" @click="copy">
          <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4" aria-hidden="true" />
          {{ copied ? t('copied') : t('copy') }}
        </button>
      </li>
    </ul>
    <p class="sr-only" aria-live="polite">{{ copied ? t('copied') : '' }}</p>
  </div>
</template>

<i18n lang="json">
{
  "en": { "title": "Share", "share": "Share", "on": "Share on {name}", "copy": "Copy link", "copied": "Link copied" },
  "pl": { "title": "Udostępnij", "share": "Udostępnij", "on": "Udostępnij na {name}", "copy": "Kopiuj link", "copied": "Skopiowano link" }
}
</i18n>
