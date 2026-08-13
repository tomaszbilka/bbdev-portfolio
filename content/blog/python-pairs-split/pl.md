---
title: "Python: podział stringa na pary znaków"
description: "Podziel tekst na dwuznakowe fragmenty. Gdy liczba znaków jest nieparzysta, ostatnią parę uzupełnij podkreśleniem."
---

## Problem

Dany jest string. Trzeba podzielić go na listę dwuznakowych fragmentów. Jeśli na końcu zostaje pojedynczy znak, brakujące drugie miejsce w parze wypełniamy `_`.

Przykłady z zadania:

- `'abc'` → `['ab', 'c_']`
- `'abcdef'` → `['ab', 'cd', 'ef']`

## Podejście

Przechodzimy po stringu co 2 znaki — slice `text[i:i+2]` robi resztę pracy. Na końcu sprawdzamy, czy ostatni element ma długość 1; jeśli tak, doklejamy `_`.

Pusty string zwraca pustą listę — nie ma czego dzielić.

## Rozwiązanie

```python
def solution(text):
    array = [text[i:i+2] for i in range(0, len(text), 2)]
    if array and len(array[-1]) == 1:
        array[-1] += "_"
    return array
```

## Przykłady

| Wejście | Wynik |
|---------|-------|
| `'abc'` | `['ab', 'c_']` |
| `'abcdef'` | `['ab', 'cd', 'ef']` |
| `''` | `[]` |
| `'a'` | `['a_']` |

```python
print(solution("abc"))      # ['ab', 'c_']
print(solution("abcdef"))   # ['ab', 'cd', 'ef']
print(solution(""))         # []
print(solution("a"))        # ['a_']
```

## Podsumowanie

> Slice co 2 znaki plus jedna linijka na nieparzystą długość — proste zadanie, które dobrze ćwiczy operacje na stringach w Pythonie.
