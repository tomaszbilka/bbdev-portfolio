---
title: "Python: permutacje stringa bez duplikatów"
description: "Wygeneruj wszystkie unikalne permutacje niepustego stringa — rekurencja z deduplikacją przez set."
---

## Problem

Dany jest niepusty string. Zwróć listę **wszystkich permutacji** — z usunięciem duplikatów, gdy string ma powtarzające się znaki.

Przykłady:

- `'a'` → `['a']`
- `'ab'` → `['ab', 'ba']`
- `'abc'` → `['abc', 'acb', 'bac', 'bca', 'cab', 'cba']` (6 elementów)
- `'aabb'` → `['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']` (6 unikalnych, nie 24)

Kolejność w wyniku nie ma znaczenia.

## Podejście

Rekurencja „wybierz znak → permutuj resztę":

1. Jeśli string ma ≤ 1 znak, zwróć go w liście
2. Dla każdego indeksu `i`: weź `char = s[i]`, reszta = `s[:i] + s[i+1:]`
3. Rekurencyjnie permutuj resztę i doklej `char` na początek każdej permutacji
4. `list(set(...))` usuwa duplikaty (np. przy `'aabb'`)

## Rozwiązanie

```python
def permutations(s):
    if len(s) <= 1:
        return [s]

    result = []

    for i, char in enumerate(s):
        remaining = s[:i] + s[i+1:]
        for p in permutations(remaining):
            result.append(char + p)

    return list(set(result))
```

## Przykłady

| Wejście | Liczba wyników | Przykładowy wynik |
|---------|----------------|-------------------|
| `'a'` | 1 | `['a']` |
| `'ab'` | 2 | `['ab', 'ba']` |
| `'abc'` | 6 | `['abc', 'bac', 'cab', 'acb', 'bca', 'cba']` |
| `'aabb'` | 6 | `['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']` |

```python
print(permutations('a'))     # ['a']
print(permutations('ab'))    # ['ab', 'ba']  (kolejność może się różnić)
print(permutations('abc'))   # 6 permutacji
print(permutations('aabb'))  # 6 unikalnych permutacji
print(len(permutations('abc')))   # 6
print(len(permutations('aabb')))  # 6
```

## Podsumowanie

> Rekurencja z wyborem „głowy" i permutacją ogona — `set` na końcu eliminuje duplikaty bez skomplikowanej logiki.
