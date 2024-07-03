## setAttributes()

### Overview

#### The setAttributes function sets attributes of one or more DOM nodes.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for all matches,
and for every match it finds,
it sets the attributes for any attribute passed into the fragment.

Fragments in a `setAttributes()` call will only match on the following conditions:

1. The tag name matches
2. The `key` property matches, if provided
3. The text content matches _exactly_, if provided

> [!NOTE]
> You cannot use an attribute to match a node, since the attributes are what's being written into the DOM.

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
setAttributes(
  <ul data-type="fruits">
    <li data-position="first">orange</li>
    <li data-position="last">apple</li>
  </ul>
);
```

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li data-position="first">orange</li>
      <li>banana</li>
      <li data-position="last">apple</li>
    </ul>
  </div>
</main>
```
