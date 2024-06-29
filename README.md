# @matry/dom

Imperative JSX - a new way to think about UI engineering.

This project was initially created for the Matry web app,
but I saw that it could be generally useful, so I'm releasing it under the MIT license.

Right now it's brand new, under active development, and pretty under-powered.
Don't use it in production.

To see examples of it in action, I've created [a repo with recipes](https://github.com/matry/dom-recipes)

## Overview

I love React, but it has issues:

1. The diffing behavior can be conceptually difficult to understand
2. It can be awkward to work with inherently imperative constructs such as `setTimeout` and `autofocus`
3. Context, hooks, and signals are all required to pass state around the UI tree
4. The structure of your application state ends up being shaped by the UI, when it should be the other way around
5. React takes total control over anything in its tree, meaning most UI packages must have React-specific integrations to work correctly
6. Getting React to work with SSR has caused lots of headaches
7. It creates a barrier between the developer and the DOM, leading to a generation of devs missing out on core platform features
8. There's a ceiling to how performant a React application can be, and maximizing performance requires deep understanding of React's rendering model
9. Because of React's one-way data flow, there are no built-in features for reading from the UI, even though this is sometimes unavoidable

I believe that React's `ui=f(state)` model, while brilliant, is the root cause of many of these issues.
We should accept the fact that the web is inherently imperative, and this library is a small attempt to make that happen.

Matry reconceives of `ui=f(state)` to be `(state=f(data))/ui`,
meaning that the UI is _a side effect of application state_.
For complex applications, the state and operations to it are paramount.
The fact that some application state comes from the UI,
and the fact that some application state is rendered to the UI,
is a peripheral fact.

## Guide

Okay so what the heck is "imperative JSX?"
Let's look at some examples.

Matry exposes a handful of simple, standalone functions that allow you to use JSX to create and update the DOM.
These functions are meant to mirror their native equivalents, and their naming reflects that design principle.

Currently, the functions are `write()`, `append()`, `setAttributes()`, `remove()`, and `empty()`.
We'll go through each of them.

### 1. Write

The write function takes an existing element and wholesale replaces its inner content.
You can think of this as akin to `document.write`.
Use this when you're performing an initial client-side render.

```jsx
write(
  document.getElementById("app"),
  <main>
    <ul id="fruits">
      <li>apple</li>
    </ul>
  </main>
);
```

### 2. Append

The append function adds new elements to the DOM (similar to `appendChild`).
Notice in this example that we pass in the same `<ul id="fruits" />` element as we did in the `write()` call.
This does _not_ re-add the element, because it already exists in the DOM.

```jsx
append(
  <ul id="fruits">
    <li>orange</li>
  </ul>
);
```

The result of this call will be the following HTML:

```html
<main>
  <ul id="fruits">
    <li>apple</li>
    <li>orange</li>
  </ul>
</main>
```

### 3. Set Attributes

As the name suggests, this function will set any attribute you define in the JSX you pass in.

```jsx
setAttributes(
  <ul id="fruits">
    <li class="selected">orange</li>
  </ul>
);
```

Result:

```html
<main>
  <ul id="fruits">
    <li>apple</li>
    <li class="selected">orange</li>
  </ul>
</main>
```

### 4. Remove

This function removes elements from the DOM.
The behavior here is a bit nuanced, so we'll show two examples:

```jsx
remove(
  <ul id="fruits">
    <li class="selected" />
  </ul>
);
```

The above code will remove the list item that has the `selected` class,
and would result in the following html:

```html
<main>
  <ul id="fruits">
    <li>apple</li>
  </ul>
</main>
```

If, however, we instead passed in the following JSX:

```jsx
remove(
  <ul id="fruits">
    <li>apple</li>
  </ul>
);
```

Then the resulting html would be the following:

```html
<main>
  <ul id="fruits">
    <li></li>
    <li class="selected">orange</li>
  </ul>
</main>
```

This is because it will remove the most descendent and identifiable node that you pass into the JSX.
In this case, we passed in the `apple` content, which means that we want to remove the text node within the first `<li>` element.

### 5. Empty

Empty is just like `remove()`, but instead of removing the target element, it will empty out its contents:

```jsx
empty(<ul id="fruits" />);
```

The result of the above would be:

```html
<main>
  <ul id="fruits"></ul>
</main>
```

## Getting Started

First, install the package.
Vite is recommended, mostly because that's what I've used to test it with :p

```bash
npm create vite my-matry-project # choose Vanilla, then JavaScript (for now)
cd my-matry-project
npm install @matry/dom
```

Next, configure Vite so that you can use Matry's JSX runtime:

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxDev: false,
    jsxInject: `import { jsx } from '@matry/dom'`,
    jsxFactory: "jsx.component",
  },
});
```

Voila! You're good to go!

## Current State

Matry should not be considered stable until `1.0.0`,
so do not use it in production until then.
There are lots of features yet to be implemented - stay tuned!

## Roadmap

Some things I have planned for the library:

- TypeScript support
- `swap()` for swapping two elements
- `move()` for moving elements around
- `paint()` for updating the CSSOM
- `serialize()` for rendering JSX to a string (primarily for SSR)
- `deserialize()` for rendering a string (will be used in respones from SSR updates)
- `addEventListeners()` for hydrating static html from the server
- `read()` for loading data from static html into JS memory
