---
title: "Python: liczba arabska na rzymską"
description: "Zamień liczbę od 1 do 3999 na zapis rzymski — cyfra po cyfrze, z regułami odejmowania dla 4 i 9."
---

## Problem

Napisz funkcję, która przyjmuje liczbę całkowitą z przedziału 1–3999 i zwraca jej reprezentację w liczbach rzymskich.

Każda cyfra arabska zamieniana jest osobno — od lewej do prawej, pomijając zera. Nie może być więcej niż 3 identycznych symboli pod rząd.

Przykłady:

- `1` → `"I"`
- `1000` → `"M"`
- `1666` → `"MDCLXVI"`
- `1990` → `"MCMXC"`
- `2008` → `"MMVIII"`

## Podejście

Rozbijamy liczbę na cyfry i przetwarzamy je od **jedności w górę** (czyli od końca stringa). Dla każdej pozycji (jedności, dziesiątki, setki, tysiące) mamy osobne symbole: I/V/X, X/L/C, C/D/M, M.

Funkcja pomocnicza `get_roman_numeral` obsługuje wartości 0–9 dla danej pozycji:

| Cyfra | Wynik |
|-------|-------|
| 0 | pusty string |
| 1–3 | powtórzenie symbolu dolnego |
| 4 | subtractive: `IV`, `XL`, `CD` |
| 5–8 | symbol wyższy + reszta dolnego |
| 9 | subtractive: `IX`, `XC`, `CM` |

Używamy `match/case` (Python 3.10+).

## Rozwiązanie

```python
def get_roman_numeral(number: int, lower: str, higher: str, next_symbol: str) -> str:
    match number:
        case 0:
            return ""
        case 1 | 2 | 3:
            return lower * number
        case 4:
            return lower + higher
        case 5 | 6 | 7 | 8:
            return higher + lower * (number - 5)
        case 9:
            return lower + next_symbol


def romanNumeralsEncoder(number: int) -> str:
    result = []
    list_array = [int(x) for x in str(number)]

    for index, item in enumerate(reversed(list_array)):
        if index == 0:
            result.append(get_roman_numeral(item, "I", "V", "X"))
        elif index == 1:
            result.append(get_roman_numeral(item, "X", "L", "C"))
        elif index == 2:
            result.append(get_roman_numeral(item, "C", "D", "M"))
        elif index == 3:
            result.append(get_roman_numeral(item, "M", None, None))

    return "".join(reversed(result))
```

## Przykłady

| Wejście | Wynik |
|---------|-------|
| `1` | `I` |
| `1000` | `M` |
| `1666` | `MDCLXVI` |
| `1990` | `MCMXC` |
| `2008` | `MMVIII` |

```python
print(romanNumeralsEncoder(1))     # I
print(romanNumeralsEncoder(1666))  # MDCLXVI
print(romanNumeralsEncoder(1990))  # MCMXC
print(romanNumeralsEncoder(2008))  # MMVIII
```

## Podsumowanie

> Cyfra po cyfrze, osobna logika dla 4 i 9 — `match/case` robi z tego czytelny kod bez długich łańcuchów `if`.
