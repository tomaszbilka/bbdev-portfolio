---
title: "Python: Arabic number to Roman numerals"
description: "Convert a number from 1 to 3999 into Roman notation — digit by digit, with subtractive rules for 4 and 9."
---

## The problem

Write a function that takes an integer between 1 and 3999 and returns its Roman numeral representation.

Each Arabic digit is converted separately — left to right, skipping zeros. No more than 3 identical symbols in a row.

Examples:

- `1` → `"I"`
- `1000` → `"M"`
- `1666` → `"MDCLXVI"`
- `1990` → `"MCMXC"`
- `2008` → `"MMVIII"`

## Approach

Split the number into digits and process them from **ones upward** (i.e. from the end of the string). Each position (ones, tens, hundreds, thousands) has its own symbols: I/V/X, X/L/C, C/D/M, M.

The helper `get_roman_numeral` handles values 0–9 for a given position:

| Digit | Result |
|-------|--------|
| 0 | empty string |
| 1–3 | repeat lower symbol |
| 4 | subtractive: `IV`, `XL`, `CD` |
| 5–8 | higher symbol + remainder of lower |
| 9 | subtractive: `IX`, `XC`, `CM` |

We use `match/case` (Python 3.10+).

## Solution

```python
def get_roman_numeral(number: int, lower: str, higher: str, next_symbol: str) -> str:
    match number:
        case 0:
            return ""
        case 1 | 2 | 3:
            return lower * number
        case 4:
            return lower + higher
        case 5 | 6 | 7 | 8:
            return higher + lower * (number - 5)
        case 9:
            return lower + next_symbol


def romanNumeralsEncoder(number: int) -> str:
    result = []
    list_array = [int(x) for x in str(number)]

    for index, item in enumerate(reversed(list_array)):
        if index == 0:
            result.append(get_roman_numeral(item, "I", "V", "X"))
        elif index == 1:
            result.append(get_roman_numeral(item, "X", "L", "C"))
        elif index == 2:
            result.append(get_roman_numeral(item, "C", "D", "M"))
        elif index == 3:
            result.append(get_roman_numeral(item, "M", None, None))

    return "".join(reversed(result))
```

## Examples

| Input | Output |
|-------|--------|
| `1` | `I` |
| `1000` | `M` |
| `1666` | `MDCLXVI` |
| `1990` | `MCMXC` |
| `2008` | `MMVIII` |

```python
print(romanNumeralsEncoder(1))     # I
print(romanNumeralsEncoder(1666))  # MDCLXVI
print(romanNumeralsEncoder(1990))  # MCMXC
print(romanNumeralsEncoder(2008))  # MMVIII
```

## Summary

> Digit by digit, separate logic for 4 and 9 — `match/case` keeps the code readable without long `if` chains.
