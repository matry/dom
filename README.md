# @matry/dom

Imperative JSX - a new way to think about UI engineering.

This project was initially created for the Matry web app,
but I saw that it could be generally useful, so I'm releasing it under the MIT license.
Right now it's brand new, under active development, and pretty under-powered.
Do _not_ use it in production until it reaches `v1.0.0`.

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
9. Because of React's one-way data flow, there are no built-in features for reading the state of the UI

If we accept the fact that the web is inherently imperative,
then I believe we can resolve most if not all of the above problems.
We don't need to throw the baby out with the bathwater though, because JSX is fantastic.

Matry exposes a handful of simple, standalone functions that allow you to use JSX to imperatively create and update the DOM.
This is a significant departure from how JSX is traditionally used,
but the benefits of this approach is that your UI remains declarative,
while your business logic remains imperative.
This means no more hooks, no more context, no more prop drilling.

Below are the functions provided by `@matry/dom`:

1. [Replace](docs/replace.md) - replaces one or more elements' children
2. [Append](docs/append.md) - appends new elements
3. [Remove](docs/remove.md) - removes elements
4. [Swap](docs/swap.md) - swaps two elements
5. [Set Content](docs/set-content.md) - sets the text content of one or more elements
6. [Set Attributes](docs/set-attributes.md) - sets attributes of one or more elements
7. [Remove Attributes](docs/remove-attributes.md) - removes attributes from one or more elements
8. [Add Event Listeners](docs/add-event-listeners.md) - adds event listeners to one or more elements
9. [Remove Event Listeners](docs/remove-event-listeners.md) - removes event listeners from one or more elements

## Quick Tour

Below is a simple counter demo.

```html
<!-- initial html -->
<html>
  <head>
    <title>My Counter App</title>
  </head>
  <body>
    <main></main>
  </body>
</html>
```

```jsx
// set our initial value
let count = 0;

// perform our initial render
replace(
  <main>
    <p key="counter">The count is {count}</p>
    <button onclick={add}>add 1</button>
  </main>
);

// replace the text content
function add() {
  count++;
  setContent(<p key="counter">The count is {count}</p>);
}
```

In the above example,
we call `replace` to render our UI into the `#app` element.
Then we use `setContent` to update the content of the `p` element.
Notice when updating the DOM, we only need to pass in just enough JSX to identify which elements we want to modify.
This puts you in _complete control_ of your apps performance.

## Tradeoffs

As with all technology, there are advantages and disadvantages of this approach.
In the interest of being transparent, I'll list the disadvantages first.

#### disadvantages

1. Since JSX is acting as a query, the queries have limited expressive power. For instance, in order to match against a node in the DOM, it must be an exact match, i.e. there can be no "contains" queries as it would introduce too many edge cases.
2. There will be duplication of html content, at least in terms of code. While this can be reduced by various strategies, it's kind of unavoidable.
3. You have to really _think_ about the UI, which is something you may not be used to if you're used to React. I'd argue this is a good thing, but it won't be everyone's cup of tea.
4. It doesn't define how you procure your state, whereas React tends to be a bit more opinionated. This can lead to more architectural work needed for developers. I'd again argue this is a net good, but you can decide for yourself whether this is something you want.

#### advantages

1. You have complete control over the rendering process, and can make Matry applications as performant as you want.
2. Matry doesn't "own" the UI you pass to JSX, so you can easily use common libraries (e.g. the Google Maps SDK) without worry. Heck, you can even render to the `html`, `head`, and `body` elements!
3. The functions offered by Matry - `write()`, `append()`, `setAttributes()` and others - are mirror counterparts to native DOM methods, meaning you can think about the platform. There's no such thing as "thinking in Matry", it's just "thinking in the web."
4. Unlike React, Matry is truly a "UI library." It has no side effects that require you to structure your code or your data in any particular way.

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
- `reverse()` for reversing lists of elements
- `paint()` for updating the CSSOM
- `serialize()` for rendering JSX to a string (primarily for SSR)
- `deserialize()` for rendering a string (will be used in respones from SSR updates)
- `read()` for loading data from static html into JS memory
