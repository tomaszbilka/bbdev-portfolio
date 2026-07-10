---
title: "enum vs const enum in TypeScript: what actually lands in your React bundle"
description: "Same source code, different JavaScript after compilation — export enum vs export const enum on NotificationChannel."
---

## Same source, different output

```ts
export enum NotificationChannel {
  EMAIL = 0,
  PUSH = 1,
}
```

Swap `enum` for `const enum` and the editor experience stays the same — autocomplete, type checks, all identical. But **TypeScript emits different JavaScript**, and that difference lands in your React bundle.

`enum` is TypeScript-only: it groups named constants so you stop sprinkling magic numbers. Each declaration gives you a **compile-time type** (`channel: NotificationChannel`) and a **runtime value** whose shape depends on `enum` vs `const enum`.

## `export enum` — runtime object

`tsc` generates a real JavaScript object with reverse mapping:

```js
export var NotificationChannel;
(function (NotificationChannel) {
  NotificationChannel[NotificationChannel["EMAIL"] = 0] = "EMAIL";
  NotificationChannel[NotificationChannel["PUSH"] = 1] = "PUSH";
})(NotificationChannel || (NotificationChannel = {}));
```

```ts
NotificationChannel.EMAIL; // 0
NotificationChannel[0];    // "EMAIL" ← reverse mapping
```

The object **ships in your bundle**. You can iterate (`Object.values()`), log it, and build UI from it:

```tsx
const options = Object.values(NotificationChannel).filter(
  (v) => typeof v === "number"
) as NotificationChannel[];

// <option>{NotificationChannel[channel]}</option>
```

**This only works with `export enum`.**

## `export const enum` — inlined literals

```ts
const channel = NotificationChannel.EMAIL;
// compiles to:
const channel = 0;
```

No runtime object. Values become `0`, `1`… No reverse mapping. Smaller bundle. `Object.values(NotificationChannel)` is a **compile error** — there is nothing at runtime.

## Comparison

| | `export enum` | `export const enum` |
|---|---------------|---------------------|
| Runtime object | Yes | No |
| Reverse mapping | Yes | No |
| `Object.values()` | Yes | No |
| Bundle size | Larger | Smaller |
| `isolatedModules` (Vite) | Safe | Needs `tsc` or special config |

## In React

Source looks the same either way:

```tsx
function ChannelBadge({ channel }: { channel: NotificationChannel }) {
  switch (channel) {
    case NotificationChannel.EMAIL:
      return <span>Email notification</span>;
    case NotificationChannel.PUSH:
      return <span>Push notification</span>;
  }
}
```

With **`export enum`**, the switch may keep enum references. With **`const enum`**, `tsc` inlines `case 0` / `case 1`. The **type** in props works in both cases — types are erased. What changes is what ships to the browser.

## React + Vite pitfalls

- **esbuild** (Vite's default) does not always inline `const enum` from other files like `tsc` does.
- **`isolatedModules: true`** — Babel/swc process files in isolation and cannot resolve `const enum` across modules. Expect *"const enum is not supported"* or silent breakage.

**Default to `export enum` in React + Vite.** Reach for `const enum` only when you've measured bundle impact and your pipeline runs through `tsc`.

## Alternative: `as const` + union type

Many teams skip both:

```ts
export const NotificationChannel = {
  EMAIL: 0,
  PUSH: 1,
} as const;

export type NotificationChannelType =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];
// 0 | 1
```

Runtime object like `export enum`, but tree-shakeable, no magical reverse mapping, and fully compatible with Vite and `isolatedModules`.

## Summary

> `export enum` = type + runtime object. `export const enum` = type only, values inlined as numbers. In React + Vite, default to `export enum` or `as const` — use `const enum` only when you've measured the bundle impact and control the compile pipeline.
