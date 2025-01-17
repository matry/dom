## removeEventListeners()

### Overview

#### The removeEventListeners function removes an event listener from one or more DOM nodes.

When this function is called,
Matry will walk the virtual fragment tree (this is the JSX input you pass to the function call).
It looks for all matches,
and for every match it finds,
it removes any event listeners that were passed into the fragment.

Fragments in a `removeEventListeners()` call will only match on the following conditions:

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
      <li data-position="last">apple</li>
    </ul>
  </div>
</main>
```

```jsx
// jsx
removeEventListeners(<li data-position="last" onclick={didClickFruit} />);
```

```javascript
// javascript
function didClickFruit(e) {
  console.log("This will not be fired");
}
```
