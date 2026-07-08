---
title: "The useMemo trap nobody talks about"
description: "When memoization hurts more than it helps — a quick look at unnecessary useMemo in React."
---

## The default instinct

Many developers wrap every computed value in `useMemo`. The instinct is understandable: React docs mention memoization for expensive calculations.

But not every calculation is expensive. And `useMemo` itself has a cost.

## A simple example

```tsx
function UserList({ users }: { users: User[] }) {
  const sorted = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  return (
    <ul>
      {sorted.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

For a list of 20 users, sorting is cheap. The `useMemo` call adds:

- Dependency comparison on every render
- Extra mental overhead when reading the code

## When useMemo actually helps

Reach for `useMemo` when:

1. The calculation is **measurably expensive** (large datasets, heavy transforms)
2. The value is passed to a **memoized child** that would otherwise re-render unnecessarily
3. You need **referential stability** for a dependency array elsewhere

## Rule of thumb

Start without `useMemo`. Add it only when profiling shows a real problem — not because "best practices" say so.

> Premature memoization is the root of all evil — or at least of confusing React code.
