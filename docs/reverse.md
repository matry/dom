## reverse()

### Overview

#### The reverse function reverses the order of child nodes in one or more DOM nodes.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for leaves in the fragment tree,
which are fragments that have no children.
For every leaf it finds, it will reverse the order of that leaf node's children.

Fragments in a `remove()` call will only match on the following conditions:

1. The tag name matches
2. The `key` property matches, if provided
3. All provided attributes match

Note that you cannot match against text content with this function.

### Examples

```html
<!-- initial html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>orange</li>
      <li>banana</li>
      <li>apple</li>
      <li>cherry</li>
    </ul>
  </div>
</main>
```

```jsx
// jsx
reverse(<ul data-type="fruits" />);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>cherry</li>
      <li>apple</li>
      <li>banana</li>
      <li>orange</li>
    </ul>
  </div>
</main>
```
