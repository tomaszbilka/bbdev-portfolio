---
title: "Python: kodowanie duplikatów znaków"
description: "Zamień każdy znak na '(' jeśli występuje raz, lub ')' jeśli więcej — ignorując wielkość liter."
---

## Problem

Dany jest string. Dla każdego znaku zwróć:

- `(` — jeśli znak występuje **tylko raz** w całym stringu
- `)` — jeśli znak występuje **więcej niż raz**

Porównanie bez uwzględniania wielkości liter (`Success` traktuje `s` i `S` jako ten sam znak).

Przykłady:

- `"din"` → `"((("`
- `"recede"` → `"()()()"`
- `"Success"` → `")())())"`
- `"(( @"` → `"))(("`

## Podejście

1. Zamień na małe litery — `word.lower()`
2. Znajdź duplikaty: znaki, których `count > 1`
3. Dla każdego znaku w oryginalnym (lowercase) stringu wstaw `(` lub `)` w zależności od tego, czy jest w zbiorze duplikatów

## Rozwiązanie

```python
def duplicate_encode(word):
    lower_case_word = word.lower()
    duplicates = set([char for char in lower_case_word if lower_case_word.count(char) > 1])
    result = [")" if char in duplicates else "(" for char in lower_case_word]
    return "".join(result)
```

## Przykłady

| Wejście | Wynik |
|---------|-------|
| `"din"` | `"((("` |
| `"recede"` | `"()()()"` |
| `"Success"` | `")())())"` |
| `"(( @"` | `"))(("` |

```python
print(duplicate_encode("din"))      # (((
print(duplicate_encode("recede"))   # ()()()
print(duplicate_encode("Success"))  # )())())
print(duplicate_encode("(( @"))     # ))((
```

## Podsumowanie

> Set duplikatów + list comprehension — czytelne rozwiązanie bez regexów i bez ręcznego liczenia w pętli.
