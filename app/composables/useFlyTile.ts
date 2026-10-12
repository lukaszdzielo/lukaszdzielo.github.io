// „Latający” kafelek: pierwszy wyróżniony projekt startuje w hero (obok portretu, lekko obrócony)
// i podczas przewijania płynnie ląduje na swoim miejscu w siatce projektów.
// Tylko od lg (siatka 3 kolumny) i bez „ogranicz ruch” – inaczej kafelek stoi zwyczajnie w siatce.
// Na miejscu docelowym widać przerywany obrys („duch”), który znika, gdy kafelek dolatuje.
//
// Płynność: w każdej klatce zmieniamy tylko transform kafelka i opacity cienia/ducha (to liczy karta
// graficzna, bez przeliczania układu strony). Pozycję docelową mierzymy na „duchu”, który stoi dokładnie
// tam, gdzie kafelek, ale nigdy się nie przesuwa – pomiar nie wymaga zdejmowania transformacji.
type Options = {
  tile: Readonly<Ref<HTMLElement | null>> // element, który leci (kafelek)
  ghost: Readonly<Ref<HTMLElement | null>> // obrys miejsca docelowego (w tym samym miejscu co kafelek)
  shadow: Readonly<Ref<HTMLElement | null>> // warstwa z dużym cieniem – widoczna w locie
  grid: Readonly<Ref<HTMLElement | null>> // siatka projektów
  anchorId?: string // miejsce startu w hero
  rotate?: number // obrót na starcie (stopnie)
}

export function useFlyTile({ tile, ghost, shadow, grid, anchorId = 'hero-tile-anchor', rotate = -7 }: Options) {
  let active = false
  let delta: { dx: number; dy: number; s: number } | null = null
  let start = 0 // przewinięcie, przy którym kafelek rusza
  let end = 1 // … i przy którym ląduje
  let progress = 1
  let frame = 0
  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  let observer: ResizeObserver | undefined
  const timers: ReturnType<typeof setTimeout>[] = []

  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const smooth = (t: number) => t * t * (3 - 2 * t)
  const docRect = (el: Element) => {
    const r = el.getBoundingClientRect()
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width }
  }

  function apply(p: number) {
    const el = tile.value
    if (!el) return
    const k = active && delta ? 1 - smooth(p) : 0 // 1 = w hero, 0 = w siatce
    el.style.transform = k > 0.0005 && delta
      ? `translate3d(${(delta.dx * k).toFixed(2)}px, ${(delta.dy * k).toFixed(2)}px, 0) rotate(${(rotate * k).toFixed(3)}deg) scale(${(1 + (delta.s - 1) * k).toFixed(4)})`
      : ''
    if (shadow.value) shadow.value.style.opacity = k.toFixed(3)
    if (ghost.value) ghost.value.style.opacity = k.toFixed(3)
  }

  const target = () => (active ? clamp((window.scrollY - start) / (end - start)) : 1)

  function measure() {
    const el = tile.value
    const anchor = document.getElementById(anchorId)
    active = !!(el && anchor && ghost.value && grid.value)
      && window.matchMedia('(min-width: 64rem)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (el) el.style.willChange = active ? 'transform' : ''
    if (active && anchor && ghost.value && grid.value) {
      const from = docRect(ghost.value) // miejsce docelowe bez transformacji
      const to = docRect(anchor)
      delta = from.w > 0 ? { dx: to.x - from.x, dy: to.y - from.y, s: to.w / from.w } : null
      const gridY = docRect(grid.value).y
      const vh = window.innerHeight
      start = Math.min(Math.max(0, gridY - vh * 1.02), vh * 0.06)
      end = Math.max(start + 140, gridY - vh * 0.42)
    }
    apply(progress)
    onScroll() // dociągnij do aktualnego przewinięcia (płynnie, bez skoku)
  }

  // Przewijanie z lekkim „dociąganiem” – kafelek płynnie goni pozycję paska przewijania
  function onScroll() {
    if (frame) return
    frame = requestAnimationFrame(function step() {
      frame = 0
      const want = target()
      progress += (want - progress) * 0.2
      if (Math.abs(want - progress) < 0.001) progress = want
      apply(progress)
      if (progress !== want) frame = requestAnimationFrame(step)
    })
  }

  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(measure, 140)
  }

  onMounted(() => {
    progress = 1
    measure()
    progress = target()
    apply(progress)
    // Wejście: kafelek pojawia się w hero po portrecie, zamiast „wskoczyć” po załadowaniu skryptów
    if (active && progress < 1) {
      tile.value?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 200, easing: 'ease-out', fill: 'backwards' })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // Pozycje zmieniają się tylko, gdy zmieni się hero albo siatka (nie przy doładowaniu obrazków niżej na stronie)
    observer = new ResizeObserver(onResize)
    const anchorBox = document.getElementById(anchorId)?.parentElement
    if (anchorBox) observer.observe(anchorBox)
    if (grid.value) observer.observe(grid.value)
    document.fonts?.ready.then(measure)
    // Portret w hero ma animację wejścia – mierzymy jeszcze raz, gdy się skończy
    timers.push(setTimeout(measure, 1000))
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    observer?.disconnect()
    cancelAnimationFrame(frame)
    clearTimeout(resizeTimer)
    timers.forEach(clearTimeout)
  })
}
