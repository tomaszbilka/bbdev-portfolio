---
title: "Python: narcissistic (Armstrong) number"
description: "Check whether a number equals the sum of its digits each raised to the power of the digit count — e.g. 153 = 1³ + 5³ + 3³."
---

## The problem

A narcissistic (Armstrong) number in base 10 equals the sum of its digits, each raised to the power of the **number of digits**.

Example — `153` has 3 digits:

    1³ + 5³ + 3³ = 1 + 125 + 27 = 153  ✓

But `1652` (4 digits) does not:

    1⁴ + 6⁴ + 5⁴ + 2⁴ = 1 + 1296 + 625 + 16 = 1938 ≠ 1652

The function should return `True` or `False`.

## Approach

1. Count digits: `power = len(str(value))`
2. Sum `int(digit) ** power` for each digit
3. Compare with the original

A list comprehension does it in one line.

## Solution

```python
def narcissistic(value):
    power = len(str(value))
    return value == sum([int(number) ** power for number in str(value)])
```

## Examples

| Input | Output |
|-------|--------|
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

## Summary

> One line with a list comprehension — a clean way to check whether a number "loves itself."
