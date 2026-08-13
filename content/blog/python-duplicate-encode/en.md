---
title: "Python: duplicate character encoding"
description: "Replace each character with '(' if it appears once, or ')' if more than once — case insensitive."
---

## The problem

Given a string, for each character return:

- `(` — if the character appears **only once** in the whole string
- `)` — if the character appears **more than once**

Comparison is case insensitive (`Success` treats `s` and `S` as the same character).

Examples:

- `"din"` → `"((("`
- `"recede"` → `"()()()"`
- `"Success"` → `")())())"`
- `"(( @"` → `"))(("`

## Approach

1. Lowercase — `word.lower()`
2. Find duplicates: characters where `count > 1`
3. For each character in the lowercase string, emit `(` or `)` depending on membership in the duplicate set

## Solution

```python
def duplicate_encode(word):
    lower_case_word = word.lower()
    duplicates = set([char for char in lower_case_word if lower_case_word.count(char) > 1])
    result = [")" if char in duplicates else "(" for char in lower_case_word]
    return "".join(result)
```

## Examples

| Input | Output |
|-------|--------|
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

## Summary

> A duplicate set plus list comprehension — readable without regex or manual counting in a loop.
