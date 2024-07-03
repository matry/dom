## setContent()

### Overview

#### The setContent function sets the text content of one or more DOM nodes.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for "content leaves" in the fragment tree,
which are fragments that only have text content.
For every match it finds,
it updates the text content with the string passed into the fragment.

Fragments in a `setContent()` call will only match on the following conditions:

1. The tag name matches
2. The `key` property matches, if provided
3. All provided attributes match

> [!NOTE]
> You cannot use text content to match a node, since the text content is what's being written into the DOM.

### Examples

```html
<!-- initial html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>orange</li>
      <li>banana</li>
      <li data-position="last">apple</li>
    </ul>
  </div>
</main>
```

```jsx
// jsx
setContent(<li data-position="last">lemon</li>);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>orange</li>
      <li>banana</li>
      <li data-position="last">lemon</li>
    </ul>
  </div>
</main>
```
