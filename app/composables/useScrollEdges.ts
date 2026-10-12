// Stan paska przewijanego w bok: czy da się przewinąć w lewo / w prawo, plus przewijanie strzałkami.
// Bez touchpada (sama myszka w zwężonym oknie) nie da się przesunąć paska w bok – stąd strzałki.
// Na elemencie ustawia też atrybuty data-more-l / data-more-r – po nich CSS wygasza brzegi
// (maska), żeby było widać, że coś jest dalej.
import type { MaybeRefOrGetter } from 'vue'

export function useScrollEdges(target: MaybeRefOrGetter<HTMLElement | null | undefined>) {
  const canPrev = ref(false)
  const canNext = ref(false)

  function update() {
    const el = toValue(target)
    if (!el) return
    canPrev.value = el.scrollLeft > 4
    canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
    el.toggleAttribute('data-more-l', canPrev.value)
    el.toggleAttribute('data-more-r', canNext.value)
  }

  // step: o ile przewinąć – domyślnie o szerokość pierwszego elementu + odstęp (kafelek),
  // przy paskach z etykietami podajemy ułamek szerokości paska
  function go(direction: 1 | -1, step?: number) {
    const el = toValue(target)
    if (!el) return
    const item = el.firstElementChild as HTMLElement | null
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
    const by = step ?? (item ? item.offsetWidth + gap : el.clientWidth * 0.8)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * by, behavior: reduce ? 'auto' : 'smooth' })
  }

  let observer: ResizeObserver | undefined
  let current: HTMLElement | null = null
  function detach() {
    current?.removeEventListener('scroll', update)
    observer?.disconnect()
    current = null
  }

  watch(
    () => toValue(target),
    (el) => {
      detach()
      if (!el) return
      current = el
      el.addEventListener('scroll', update, { passive: true })
      observer = new ResizeObserver(update)
      observer.observe(el)
      // zmiana zawartości (np. inne liczby w filtrach) też zmienia szerokość
      for (const child of el.children) observer.observe(child)
      update()
    },
    { immediate: true, flush: 'post' },
  )
  onBeforeUnmount(detach)

  return { canPrev, canNext, go, update }
}
