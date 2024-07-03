## append()

### Overview

#### The append function inserts new nodes into the DOM.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
Once it finds a non-match,
it will insert the non-matching fragment and all of its descendents.
Note that this function will _not_ replace any existing nodes;
for that you should use other Matry functions.

Where exactly it will be inserted depends on the position of the first non-matching fragment...

1. If the fragment has a previous fragment sibling that has a match node,
   then it will be appended as the next element sibling of the matching node.
2. If the fragment has a next fragment sibling that has a matching node,
   then it will be appended as the previous element sibling of the matching node.
3. If previous conditions fail to match,
   then the element will be appended as the last element child.

Fragments in an `append()` call will only match on the following conditions:

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
append(
  <ul data-type="fruits">
    <li>cherry</li>
  </ul>
);
```

```html
<!-- result html -->
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
