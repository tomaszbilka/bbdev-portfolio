---
title: "enum vs const enum w TypeScript: co faktycznie trafia do bundla Reacta"
description: "Ten sam kod źródłowy, inny JavaScript po kompilacji — export enum vs export const enum na przykładzie NotificationChannel."
---

## Ten sam kod, inny wynik

```ts
export enum NotificationChannel {
  EMAIL = 0,
  PUSH = 1,
}
```

Zamień `enum` na `const enum` i w edytorze nic się nie zmienia — autouzupełnianie, typy, wszystko tak samo. Ale **TypeScript generuje inny JavaScript**, i ta różnica ląduje w bundlu Reacta.

`enum` istnieje tylko w TypeScript: grupuje nazwane stałe, żeby nie rozsiewać magicznych liczb. Z jednej deklaracji dostajesz **typ przy kompilacji** (`channel: NotificationChannel`) i **wartość w runtime**, której kształt zależy od `enum` vs `const enum`.

## `export enum` — obiekt w runtime

`tsc` generuje prawdziwy obiekt JavaScript z reverse mapping:

```js
export var NotificationChannel;
(function (NotificationChannel) {
  NotificationChannel[NotificationChannel["EMAIL"] = 0] = "EMAIL";
  NotificationChannel[NotificationChannel["PUSH"] = 1] = "PUSH";
})(NotificationChannel || (NotificationChannel = {}));
```

```ts
NotificationChannel.EMAIL; // 0
NotificationChannel[0];    // "EMAIL" ← reverse mapping
```

Obiekt **trafia do bundla**. Możesz iterować (`Object.values()`), logować i budować UI:

```tsx
const options = Object.values(NotificationChannel).filter(
  (v) => typeof v === "number"
) as NotificationChannel[];

// <option>{NotificationChannel[channel]}</option>
```

**To działa tylko z `export enum`.**

## `export const enum` — literały zamiast obiektu

```ts
const channel = NotificationChannel.EMAIL;
// kompiluje się do:
const channel = 0;
```

Brak obiektu w runtime. Wartości stają się `0`, `1`… Brak reverse mapping. Mniejszy bundle. `Object.values(NotificationChannel)` to **błąd kompilacji** — w runtime nic nie ma.

## Porównanie

| | `export enum` | `export const enum` |
|---|---------------|---------------------|
| Obiekt w runtime | Tak | Nie |
| Reverse mapping | Tak | Nie |
| `Object.values()` | Tak | Nie |
| Rozmiar bundla | Większy | Mniejszy |
| `isolatedModules` (Vite) | Bezpieczne | Wymaga `tsc` lub specjalnej konfiguracji |

## W React

Kod źródłowy wygląda tak samo w obu przypadkach:

```tsx
function ChannelBadge({ channel }: { channel: NotificationChannel }) {
  switch (channel) {
    case NotificationChannel.EMAIL:
      return <span>Powiadomienie e-mail</span>;
    case NotificationChannel.PUSH:
      return <span>Powiadomienie push</span>;
  }
}
```

Z **`export enum`** switch może zachować referencje do enum. Z **`const enum`** `tsc` wstawia `case 0` / `case 1`. **Typ** w props działa w obu przypadkach — typy i tak znikają. Zmienia się to, co trafia do przeglądarki.

## Pułapki w React + Vite

- **esbuild** (domyślny w Vite) nie zawsze inline'uje `const enum` z innych plików tak jak `tsc`.
- **`isolatedModules: true`** — Babel/swc przetwarzają pliki w izolacji i nie rozwiążą `const enum` między modułami. Spodziewaj się *"const enum is not supported"* albo cichych problemów.

**Domyślnie używaj `export enum` w React + Vite.** Sięgaj po `const enum` tylko gdy zmierzyłeś wpływ na bundle i pipeline idzie przez `tsc`.

## Alternatywa: `as const` + union type

Wiele zespołów omija oba warianty:

```ts
export const NotificationChannel = {
  EMAIL: 0,
  PUSH: 1,
} as const;

export type NotificationChannelType =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];
// 0 | 1
```

Obiekt w runtime jak przy `export enum`, ale tree-shakeable, bez magicznego reverse mapping i w pełni kompatybilny z Vite i `isolatedModules`.

## W skrócie

> `export enum` = typ + obiekt w JS. `export const enum` = tylko typ, wartości wstawiane jako liczby. W React + Vite domyślnie sięgaj po `export enum` lub `as const` — `const enum` tylko gdy zmierzyłeś wpływ na bundle i kontrolujesz pipeline kompilacji.
