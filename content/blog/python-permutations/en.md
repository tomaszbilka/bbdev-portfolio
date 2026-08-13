---
title: "Python: string permutations without duplicates"
description: "Generate all unique permutations of a non-empty string — recursion with set deduplication."
---

## The problem

Given a non-empty string, return a list of **all permutations** — with duplicates removed when the string has repeated characters.

Examples:

- `'a'` → `['a']`
- `'ab'` → `['ab', 'ba']`
- `'abc'` → `['abc', 'acb', 'bac', 'bca', 'cab', 'cba']` (6 items)
- `'aabb'` → `['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']` (6 unique, not 24)

Order in the result does not matter.

## Approach

Recursive "pick a character → permute the rest":

1. If the string has ≤ 1 character, return it in a list
2. For each index `i`: take `char = s[i]`, remainder = `s[:i] + s[i+1:]`
3. Recursively permute the remainder and prepend `char` to each permutation
4. `list(set(...))` removes duplicates (e.g. for `'aabb'`)

## Solution

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

## Examples

| Input | Count | Sample output |
|-------|-------|---------------|
| `'a'` | 1 | `['a']` |
| `'ab'` | 2 | `['ab', 'ba']` |
| `'abc'` | 6 | `['abc', 'bac', 'cab', 'acb', 'bca', 'cba']` |
| `'aabb'` | 6 | `['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']` |

```python
print(permutations('a'))     # ['a']
print(permutations('ab'))    # ['ab', 'ba']  (order may vary)
print(permutations('abc'))   # 6 permutations
print(permutations('aabb'))  # 6 unique permutations
print(len(permutations('abc')))   # 6
print(len(permutations('aabb')))  # 6
```

## Summary

> Recursion that picks a "head" and permutes the "tail" — `set` at the end removes duplicates without complex logic.
