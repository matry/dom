## empty()

### Overview

#### The empty function empties the contents of one or more DOM nodes.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for leaves in the fragment tree,
which are fragments that have no children.
For every leaf it finds, it will remove whatever child nodes are found in the DOM.

This function is very similar to the `remove()` function,
with the exception that it leaves the matching element in the DOM.

Fragments in a `remove()` call will only match on the following conditions:

1. The tag name matches
2. The `key` property matches, if provided
3. All provided attributes match
4. The text content matches _exactly_, if provided

### Examples

```html
<!-- initial html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>orange</li>
      <li>banana</li>
      <li>apple</li>
    </ul>
  </div>
</main>
```

```jsx
// jsx
remove(<ul data-type="fruits" />);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits"></ul>
  </div>
</main>
```
