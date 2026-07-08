---
title: "Pułapka useMemo, o której mało kto mówi"
description: "Kiedy memoizacja szkodzi więcej niż pomaga — krótki wpis o zbędnym useMemo w React."
---

## Domyślny instynkt

Wielu developerów owija każdą obliczoną wartość w `useMemo`. Instynkt jest zrozumiały: dokumentacja React wspomina o memoizacji przy kosztownych obliczeniach.

Ale nie każde obliczenie jest kosztowne. Samo `useMemo` też ma cenę.

## Prosty przykład

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

Dla listy 20 użytkowników sortowanie jest tanie. Wywołanie `useMemo` dodaje:

- Porównywanie zależności przy każdym renderze
- Dodatkowy narzut poznawczy przy czytaniu kodu

## Kiedy useMemo naprawdę pomaga

Sięgnij po `useMemo`, gdy:

1. Obliczenie jest **mierzalnie kosztowne** (duże zbiory danych, ciężkie transformacje)
2. Wartość trafia do **memoizowanego dziecka**, które inaczej by się niepotrzebnie re-renderowało
3. Potrzebujesz **stabilności referencji** dla tablicy zależności gdzie indziej

## Zasada kciuka

Zacznij bez `useMemo`. Dodawaj go dopiero, gdy profilowanie pokaże realny problem — nie dlatego, że „best practices" każą.

> Przedwczesna memoizacja to źródło zła — albo przynajmniej mylącego kodu React.
