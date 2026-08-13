---
title: "Python: pseudo-encryption by shuffling indices"
description: "Swap even and odd index characters N times — plus a decrypt function that reverses it."
---

## The problem

Given a string `S` and an integer `N`, the algorithm:

1. Take characters at **odd** indices (1, 3, 5…)
2. Append characters at **even** indices (0, 2, 4…)
3. Repeat steps 1–2 exactly `N` times

Examples for `encrypt`:

- `encrypt("012345", 1)` → `"135024"`
- `encrypt("012345", 2)` → `"304152"`
- `encrypt("012345", 3)` → `"012345"` — after 3 steps we're back to the start!

For odd-length strings it works the same — e.g. `encrypt("01234", 2)` → `"32104"`.

## Approach — encrypt

Each iteration splits the string into two lists by index parity, joins `odd + even`, and repeats.

## Approach — decrypt

Reverse operation: the first half of the encrypted string holds odd-index characters, the second half holds even-index ones. Interleave them back: `even[i]`, `odd[i]`, `even[i+1]`, `odd[i+1]`…

## Solution

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

## Examples

### encrypt

| Input | N | Output |
|-------|---|--------|
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

## Summary

> Simple index shuffling in a loop — fun fact: for `"012345"`, the third encryption restores the original. Writing `decrypt` helps you understand the reverse operation.
