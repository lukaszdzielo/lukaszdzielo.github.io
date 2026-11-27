// Rysunek z banera wpisu (public/art/blog/*.svg) przygotowany do „rysowania się” po wejściu na wpis.
// Każdy kształt dostaje opóźnienie --d (0–1) z położenia w poziomie, więc rysunek powstaje od lewej do prawej,
// tak jak czyta się schemat. Linie ciągłe dostają pathLength="1" i klasę .l (kreska rysuje się od początku do końca,
// wypełnienie pojawia się po niej), a linie przerywane i tekst – klasę .f (tylko wejście z przezroczystości):
// pathLength zmieniłby długość ich kresek. Animacje są w app/assets/css/main.css (.art-draw).

const SHAPES = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text']);
const ART_WIDTH = 480; // szerokość viewBox wszystkich rysunków

// Pierwsza współrzędna x kształtu – tyle wystarczy, żeby ustawić kolejność od lewej do prawej
function startX(tag: string, attrs: string, centered: boolean): number {
    const num = (name: string) => Number(attrs.match(new RegExp(`\\s${name}="(-?[\\d.]+)"`))?.[1] ?? 0);
    switch (tag) {
        case 'path': return Number(attrs.match(/\sd="\s*[Mm]\s*(-?[\d.]+)/)?.[1] ?? 0);
        case 'circle': return num('cx') - num('r');
        case 'ellipse': return num('cx') - num('rx');
        case 'line': return Math.min(num('x1'), num('x2'));
        case 'polyline':
        case 'polygon': return Number(attrs.match(/\spoints="\s*(-?[\d.]+)/)?.[1] ?? 0);
        // tekst wyśrodkowany (text-anchor="middle") zaczyna się mniej więcej 30 px przed swoim x
        case 'text': return num('x') - (centered ? 30 : 0);
        default: return num('x');
    }
}

export function drawArt(svg: string): string {
    // Stos otwartych elementów: czy przerywana linia albo wyśrodkowany tekst przychodzą z rodzica (<g>), czy jesteśmy w <defs>
    const stack = [{ dashed: false, centered: false, defs: false }];
    return svg
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g, (tag, close: string, name: string, attrs: string, self: string) => {
            if (close) {
                stack.pop();
                return tag;
            }
            const parent = stack[stack.length - 1]!;
            const own = {
                dashed: parent.dashed || attrs.includes('stroke-dasharray'),
                centered: parent.centered || attrs.includes('text-anchor="middle"'),
                defs: parent.defs || name === 'defs',
            };
            if (!self) stack.push(own);

            if (name === 'svg') {
                return `<svg${attrs} width="480" height="300" class="art-draw block h-auto w-full" aria-hidden="true" focusable="false"${self}>`;
            }
            if (own.defs || !SHAPES.has(name)) return tag;

            const d = Math.min(1, Math.max(0, startX(name, attrs, own.centered) / ART_WIDTH)).toFixed(2);
            const line = !own.dashed && name !== 'text';
            return `<${name}${attrs}${line ? ' pathLength="1"' : ''} class="${line ? 'l' : 'f'}" style="--d:${d}"${self}>`;
        });
}
