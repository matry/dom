## remove()

### Overview

#### The remove function removes nodes from the DOM.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for leaves in the fragment tree,
which are fragments that have no children.
For every leaf it finds, it will attempt to match it against a DOM node.

If it finds a match, it will remove that node and all of its descendents.

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
remove(
  <ul data-type="fruits">
    <li>orange</li>
  </ul>
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

Note that this does _not_ allow you to only remove text content from an element.
Matry provides other functions for that purpose.
