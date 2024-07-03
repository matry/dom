## swap()

### Overview

#### The swap function swaps the placement of two elements in the DOM.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for leaves in the fragment tree,
which are fragments that have no children.
For every leaf it finds, it will attempt to match it against a DOM node.

Since this is a _swap_,
the function assumes that you want to match exactly 2 elements.
If it finds 0 or 1 matches, then it will return as a no-op.
If it finds 3 or more matches, then it will discard all but the first two matched elements.

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
swap(
  <ul data-type="fruits">
    <li>orange</li>
    <li>apple</li>
  </ul>
);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>apple</li>
      <li>banana</li>
      <li>orange</li>
    </ul>
  </div>
</main>
```
