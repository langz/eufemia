---
title: 'Naming conventions'
order: 6
---

# Naming conventions

The DNB Design System Eufemia uses the following naming conventions.

**Formatting styles**

- **pascal case** also known as _upper camel case_. Every word upper case. Example: `PascalCase`
- **camel case** also known as _lower camel case_. First word lower case. Example: `camelCase`
- **lisp case** also known as _kebab case_. Only lower case letters. Example: `lisp-case`
- **snake case**. Only lower case letters. Example: `snake_case`

## React components

- React Components, both as files and as components use **pascal case**.
- The folder containing the component uses **lisp case**.

## Web components

- Web components use **lisp case**.
- They are prefixed with: `dnb-`

## CSS / SCSS

- CSS classes and the files containing the styles use **lisp case**.
- CSS classes are prefixed with: `dnb-`
- CSS `Custom Properties` (CSS Variables) use **lisp case**.
- SCSS Mixins use **camel case**.

## Javascript

- `Functions` and `Variables` use **camel case**.
- `Classes` use **pascal case**.
- Other Javascript files use **lisp case**.

## Events and Properties

- Event names use **snake case**.
- They have to describe what they are aiming to do. Like: `on_click`

## Icons

- Icon names use **snake case**.
- They have to describe what they are aiming to meant for. Like: `chevron_right`
- Sizes are added as a postfix. Like: `chevron_right_medium`
- Only alphabetic characters (a to z) without special chars, due to import statements.
- Figma icon naming has to match the same (icon archive) as they will define the import names.
- Figma page and frame names (icon archive) do have to consist the same, due to the automated import mechanism.

## Documentation

- `Pages` and directories use **lisp case**.

---

## Why `snake_case` property naming

The decision to use `snake_case` was made to not just adopt React terms (`PascalCase`), because we wanted to be open for future changes in the front end world.

But also the technical limitation that **Web Components** do not support `PascalCase` made us more confident to use another case style.

HTML attributes uses `lisp-case`, so we needed something between.

The aspect to distinguish between case styles will also make code easier to read and support future code changes and refactoring.

```jsx
<Component aria-hidden="true" myReactProp={...} on_click={...} />
```
