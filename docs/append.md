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
3. If the fragment has a previous fragment sibling that is a text fragment of the string "...",
   then it is considered to be a wildcard,
   and thus the fragment will be appended as the last element in the node list.
4. If the fragment has a next fragment sibling that is a text fragment of the string "...",
   then it is considered to be a wildcard,
   and thus the fragment will be appended as the first element in the node list.
5. If all previous conditions fail to match,
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

As you can see,
Matry doesn't require you to re-write the entire html tree,
only the minimal structure needed to uniquely identify the nodes you want to target.

In this case, because we did not provide any siblings for the "cherry" list item,
it defaulted to being appended as the last element child.

If instead we had written this:

```jsx
// jsx
append(
  <ul data-type="fruits">
    <li>cherry</li>
    ...
  </ul>
);
```

Then the result would have been:

```html
<!-- result html -->
<main>
  <div id="app">
    <ul data-type="fruits">
      <li>cherry</li>
      <li>orange</li>
      <li>banana</li>
      <li>apple</li>
    </ul>
  </div>
</main>
```
