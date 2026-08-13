---
title: "Python: liczba narcystyczna (Armstronga)"
description: "Sprawdź, czy liczba jest sumą swoich cyfr podniesionych do potęgi liczby cyfr — np. 153 = 1³ + 5³ + 3³."
---

## Problem

Liczba narcystyczna (Armstronga) w systemie dziesiętnym to liczba równa sumie swoich cyfr, każda podniesiona do potęgi **liczby cyfr**.

Przykład — `153` ma 3 cyfry:

    1³ + 5³ + 3³ = 1 + 125 + 27 = 153  ✓

A `1652` (4 cyfry) już nie:

    1⁴ + 6⁴ + 5⁴ + 2⁴ = 1 + 1296 + 625 + 16 = 1938 ≠ 1652

Funkcja ma zwracać `True` lub `False`.

## Podejście

1. Policz cyfry: `power = len(str(value))`
2. Zsumuj `int(cyfra) ** power` dla każdej cyfry
3. Porównaj z oryginałem

List comprehension robi to w jednej linii.

## Rozwiązanie

```python
def narcissistic(value):
    power = len(str(value))
    return value == sum([int(number) ** power for number in str(value)])
```

## Przykłady

| Wejście | Wynik |
|---------|-------|
| `153` | `True` |
| `1652` | `False` |
| `7` | `True` |
| `9474` | `True` |

```python
print(narcissistic(153))   # True
print(narcissistic(1652))  # False
print(narcissistic(7))     # True
print(narcissistic(9474))  # True
```

## Podsumowanie

> Jedna linijka z list comprehension — elegancki sposób na sprawdzenie, czy liczba „kocha same siebie".
