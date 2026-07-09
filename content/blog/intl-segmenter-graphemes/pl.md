---
title: "Intl.Segmenter: licz znaki jak człowiek, nie jak komputer"
description: "JavaScriptowe .length kłamie przy emoji i znakach diakrytycznych. Intl.Segmenter dzieli tekst na prawdziwe grafemy — oto jak z tego korzystać."
---

## Problem

Otwórz konsolę i wpisz:

```js
"👨‍👩‍👧".length     // 8
[..."👨‍👩‍👧"].length // 8
```

Jedno emoji. Osiem „znaków" według JavaScriptu.

To samo dotyczy znaków złożonych jak `é` (jedna widoczna litera, czasem zapisana jako `e` + łączący akcent), flag, modyfikatorów koloru skóry czy tekstu ze **Zero Width Joiner**.

Stringi w JavaScript to UTF-16. `.length` i spread `[...str]` liczą **code units** — wewnętrzne kawałki pamięci. Człowiek liczy **grafemy** — to, co faktycznie widzi na ekranie.

Jeśli budujesz licznik znaków, animację pisania litera po literze albo walidację `maxLength`, ta rozbieżność Cię ugryzie.

## Co to jest `Intl`?

`Intl` to **wbudowane API JavaScriptu** — bez importu, bez paczki z npm. Jest w przeglądarkach i Node.js (16+).

Pomyśl o tym jak o `Math`: `Math` daje `sin()` i `sqrt()`, `Intl` daje formatowanie i operacje na tekście zależne od języka.

Jego rola: obsługa rzeczy zależnych od **języka i kultury** — daty, liczby, waluty, reguły sortowania i segmentacja tekstu.

## `Intl.Segmenter` w pigułce

`Segmenter` to narzędzie `Intl` do **krojenia tekstu na sensowne kawałki**.

```ts
const segmenter = new Intl.Segmenter("pl", { granularity: "grapheme" });
const parts = Array.from(segmenter.segment("Łódź"), (s) => s.segment);
// ["Ł", "ó", "d", "ź"]
```

### Parametry konstruktora

| Parametr | Wartości | Znaczenie |
|----------|----------|-----------|
| `locale` | `"pl"`, `"en"`, `undefined` | Reguły segmentacji dla danego języka |
| `granularity` | `"grapheme"` / `"word"` / `"sentence"` | Co tniemy |

### Kluczowe metody

- `new Intl.Segmenter(locale, options)` — tworzy segmenter
- `.segment(string)` — zwraca **iterator** obiektów `{ segment, index, isWordLike? }`
- `Array.from(segmenter.segment(str), s => s.segment)` — zamiana na zwykłą tablicę `string[]`

### Wsparcie w przeglądarkach

Chrome 87+, Firefox 125+, Safari 14.1+, Node 16+. Nie wszędzie — stąd potrzeba fallbacku.

## Przykładowa implementacja

Mały, gotowy do produkcji wrapper:

```ts
export function toGraphemes(value: string, locale?: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    return Array.from(segmenter.segment(value), (s) => s.segment);
  }
  return [...value];
}
```

Co robi każda część:

1. **Guard** — sprawdza, czy `Segmenter` istnieje (stare przeglądarki, niektóre środowiska SSR)
2. **`granularity: "grapheme"`** — dzieli na widoczne znaki, nie code units
3. **`Array.from`** — zamienia iterator na tablicę do `.map()`, `.length` itd.
4. **Fallback `[...value]`** — działa dla prostego ASCII, ale psuje się na emoji

## Przykłady

```ts
toGraphemes("Łódź")         // ["Ł", "ó", "d", "ź"]
toGraphemes("café")         // ["c", "a", "f", "é"]
toGraphemes("👨‍👩‍👧")       // ["👨‍👩‍👧"] — jeden element
toGraphemes("hello").length // 5 — długość, którą powinien pokazać UI
```

### Praktyczny przypadek: licznik znaków

```tsx
function CharCounter({ text, max }: { text: string; max: number }) {
  const count = toGraphemes(text).length;
  return (
    <span className={count > max ? "text-red-500" : ""}>
      {count}/{max}
    </span>
  );
}
```

Inne miejsca, gdzie sięgniesz po to: pola bio, limity długości postów, animacje litera po literze, ruch kursora w własnych edytorach tekstu.

## Co jeszcze jest w `Intl`?

`Segmenter` to najmniej znany członek przydatnej rodziny. Krótkie zajawki:

**`Intl.DateTimeFormat`** — daty zależne od locale:

```js
new Intl.DateTimeFormat("pl").format(new Date());
// "9.07.2026"
```

**`Intl.NumberFormat`** — liczby i waluty:

```js
new Intl.NumberFormat("pl", { style: "currency", currency: "PLN" }).format(1234.5);
// "1 234,50 zł"
```

**`Intl.Collator`** — poprawne sortowanie wg locale:

```js
["café", "cafe", "caffé"].sort(new Intl.Collator("fr").compare);
```

**`Intl.ListFormat`** — listy czytelne dla człowieka:

```js
new Intl.ListFormat("pl", { type: "conjunction" }).format(["Ala", "Bartek", "Celina"]);
// "Ala, Bartek i Celina"
```

**`Intl.RelativeTimeFormat`** — teksty w stylu „2 dni temu":

```js
new Intl.RelativeTimeFormat("pl").format(-2, "day");
// "2 dni temu"
```

`Segmenter` nie pojawi się tak często jak `DateTimeFormat` czy `NumberFormat`, ale gdy pracujesz z tekstem widocznym dla użytkownika, nie da się go zastąpić `.length`.

## Kiedy używać?

> Używaj `Intl.Segmenter` zamiast `.length` lub `[...str]`, gdy liczysz **widoczne znaki** — walidacja formularzy, limity social media, animacje tekstu, wszystko co użytkownik widzi na ekranie.
