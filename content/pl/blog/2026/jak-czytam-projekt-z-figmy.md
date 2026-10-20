---
date: 2026-12-15
title: 'Jak czytam projekt z Figmy, zanim napiszę pierwszą linijkę'
description: Od czego zaczynam, gdy dostaję projekt z Figmy, o co pytam od razu i w czym pomaga mi to, że wcześniej byłem grafikiem.
tags:
- figma
- workflow
- design
kind: post
art: /art/blog/jak-czytam-projekt-z-figmy.svg
ogImage: /og/blog/jak-czytam-projekt-z-figmy-pl.jpg
translationKey: jak-czytam-projekt-z-figmy
draft: false
---

Zanim napiszę pierwszą linijkę kodu, spędzam trochę czasu w samym projekcie. Wcześniej pracowałem też jako grafik, więc patrzę na projekt z dwóch stron: jak programista, który lubi powtarzalne elementy i jasne reguły, i jak ktoś, kto sam kiedyś takie projekty przygotowywał. Oto, od czego zaczynam i o co pytam.

## Najpierw assety

Na początku sprawdzam assety. Chcę wiedzieć, jakie stałe elementy pojawiają się w projekcie: przyciski, pola formularzy, karty, ikony, kolory i fonty. To one staną się w kodzie komponentami i zmiennymi. Jeśli wiem o nich od początku, piszę je raz, a nie przy każdym widoku od nowa.

## Potem odstępy i komponenty

Następnie oglądam odstępy i porównuję, czy elementy na ekranach są faktycznie połączone z komponentami z assetów. Przycisk, który wygląda tak samo jak w bibliotece, może być odłączoną kopią – z innym odstępem albo innym kolorem. Na ekranie różnica jest prawie niewidoczna, ale w kodzie oznacza pytanie: to błąd czy nowy wariant?

## Pytam od razu

Jeśli coś mi się nie zgadza, wolę to od razu skonsultować – z przełożonym albo z grafikiem. Pytam, jak to widzą i czy na pewno tak ma wyglądać. Krótkie pytanie na początku kosztuje mniej niż przepisywanie gotowego widoku.

## Co najczęściej trzeba doprecyzować

- **Różne odstępy** w podobnych miejscach – na przykład 16 px na jednej karcie i 20 px na drugiej.
- **Brak stanów** – nie ma wersji przycisku po najechaniu myszką, pola z błędem albo pustej listy.
- **Brak wersji na telefon** albo tylko jeden ekran zamiast całego widoku.
- **Treść schowana w przewijanym elemencie.** W Figmie mogę sprawdzić prawie wszystko, co widzę. Gdy jednak element ma przewijaną treść, to, czego nie widać, i tak muszę odwzorować. Wtedy proszę grafika, żeby skopiował całą przewijaną treść i ułożył ją obok. Jeśli to komponent i mogę do niego przejść – świetnie, ale nie zawsze tak jest.

## W czym pomaga mi to, że byłem grafikiem

To, że programuję, sprawia, że lubię elementy powtarzalne, z góry przygotowany schemat i listę reguł, według których idę. To, że byłem grafikiem, pozwala mi wypełnić lukę, gdy coś trzeba dogadać z grafikiem albo gdy grafika nie ma i sam muszę coś dopasować. Wtedy odruchowo układam elementy tak, żeby ze sobą współgrały.

Patrzę też na projekt z punktu widzenia klienta, który nie ma styczności z projektowaniem. Chodzi o to, żeby osoba na stronie nie błądziła wzrokiem i nie klikała na ślepo, tylko od razu wiedziała, jak coś się zachowa.

## Co z tego zostało

- Zaczynam od assetów – to przyszłe komponenty i zmienne w kodzie.
- Sprawdzam, czy elementy na ekranach są połączone z komponentami, a nie są odłączonymi kopiami.
- Niejasności wyjaśniam od razu, a nie po napisaniu widoku.
- Pytam o stany, wersję na telefon i treść schowaną w przewijanych elementach.
