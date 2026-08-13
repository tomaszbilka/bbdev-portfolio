---
title: "Python: pseudo-szyfrowanie przez mieszanie indeksów"
description: "Parzyste i nieparzyste indeksy zamieniane miejscami N razy — plus funkcja decrypt, która to odwraca."
---

## Problem

Dany jest string `S` i liczba całkowita `N`. Algorytm:

1. Weź znaki o **nieparzystych** indeksach (1, 3, 5…)
2. Doklej znaki o **parzystych** indeksach (0, 2, 4…)
3. Powtórz krok 1–2 dokładnie `N` razy

Przykłady `encrypt`:

- `encrypt("012345", 1)` → `"135024"`
- `encrypt("012345", 2)` → `"304152"`
- `encrypt("012345", 3)` → `"012345"` — po 3 krokach wracamy do początku!

Dla nieparzystej długości stringa działa tak samo — np. `encrypt("01234", 2)` → `"32104"`.

## Podejście — encrypt

W każdej iteracji dzielimy string na dwie listy według parzystości indeksu, składamy `odd + even` i powtarzamy.

## Podejście — decrypt

Operacja odwrotna: pierwsza połowa zaszyfrowanego stringa to nieparzyste indeksy, druga — parzyste. Przeplatasz je z powrotem: `even[i]`, `odd[i]`, `even[i+1]`, `odd[i+1]`…

## Rozwiązanie

```python
def encrypt(encrypted_text, n):
    result = encrypted_text

    while n > 0:
        even_indexes = []
        odd_indexes = []
        for index, item in enumerate(result):
            if index % 2 == 0:
                even_indexes.append(item)
            else:
                odd_indexes.append(item)

        result = "".join(odd_indexes + even_indexes)
        n -= 1

    return result


def decrypt(text, n):
    result = text

    while n > 0:
        middle = len(result) // 2
        combined = []
        odd_part = result[:middle]
        even_part = result[middle:]

        for i in range(max(len(odd_part), len(even_part))):
            combined.append(even_part[i])
            if i < len(odd_part):
                combined.append(odd_part[i])

        result = "".join(combined)
        n -= 1

    return result
```

## Przykłady

### encrypt

| Wejście | N | Wynik |
|---------|---|-------|
| `"012345"` | 1 | `"135024"` |
| `"012345"` | 2 | `"304152"` |
| `"012345"` | 3 | `"012345"` |
| `"01234"` | 2 | `"32104"` |

```python
print(encrypt("012345", 1))  # 135024
print(encrypt("012345", 2))  # 304152
print(encrypt("012345", 3))  # 012345
print(encrypt("01234", 2))   # 32104
```

### decrypt

```python
print(decrypt("s eT ashi tist!", 2))  # This is a test!
```

## Podsumowanie

> Proste mieszanie indeksów z pętlą — ciekawostka: dla `"012345"` trzecie szyfrowanie przywraca oryginał. Warto też napisać `decrypt`, żeby zrozumieć odwrotną operację.
