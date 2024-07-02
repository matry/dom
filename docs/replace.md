## replace()

### Overview

#### The replace function replaces nodes in the DOM.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for the deepest matching fragment in every sub-tree of the passed-in JSX.
For each one, it will replace its children with the children of the JSX sub-tree.

Fragments in a `replace()` call will only match on the following conditions:

1. The tag name matches
2. The `key` property matches, if provided
3. All provided attributes match

Note that text content cannot be used to match against an element,
since the content itself is what will replace the DOM content.

### Examples

```html
<!-- initial html -->
<main>
  <div id="app"></div>
</main>
```

```jsx
// jsx
replace(
  <div id="app">
    <ul data-type="fruits">
      <li>banana</li>
      <li>apple</li>
    </ul>
  </div>
);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>banana</li>
      <li>apple</li>
    </ul>
  </div>
</main>
```

If you are coming from React and are using CSR (client-side rendering),
this function can be used just like the initial `render()` call provided by React.
