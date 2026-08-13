---
title: "Python: split a string into character pairs"
description: "Split text into two-character chunks. When the length is odd, pad the final pair with an underscore."
---

## The problem

Given a string, split it into a list of two-character chunks. If a single character remains at the end, fill the missing second slot in that pair with `_`.

Examples from the kata:

- `'abc'` → `['ab', 'c_']`
- `'abcdef'` → `['ab', 'cd', 'ef']`

## Approach

Walk the string in steps of 2 — the slice `text[i:i+2]` does the heavy lifting. At the end, check whether the last element has length 1; if so, append `_`.

An empty string returns an empty list — nothing to split.

## Solution

```python
def solution(text):
    array = [text[i:i+2] for i in range(0, len(text), 2)]
    if array and len(array[-1]) == 1:
        array[-1] += "_"
    return array
```

## Examples

| Input | Output |
|-------|--------|
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

## Summary

> A slice every 2 characters plus one line for odd lengths — a simple kata that exercises basic string operations in Python.
