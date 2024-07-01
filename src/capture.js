import { findElementByXPath, getTextContent } from './utils';

/*types

NodeResult {
  fragment: VirtualFragment
  parentFragment: VirtualFragment
  nextFragment: VirtualFragment
  previousFragment: VirtualFragment

  node: Node
  parentNode: Node
  nextNode: Node
  previousNode: Node
}

*/

export function capture(vFragment, parentNode = document, results = []) {
  if (typeof obj === 'string') {
    if (parentNode !== null) {
      results.push({
        target: parentNode,
        appendee: obj,
        relationship: 'child',
      });
    }

    return;
  }


  let targetNode = parentNode.querySelector(vFragment.attributes.id);

  if (targetNode) {
    results.push({
      type: 'html',
      node: targetNode,
    });

    if (vFragment.children.length) {
      for (const childFragment of vFragment.children) {
        capture(childFragment, targetNode, results);
      }
      return;
    }
  }
}


/*



find(
  <ul id="a">
    <li>some existing item</li>
    <li>some new item</li>
  </ul>
)
ul#a
ul#a li(some existing item)
ul#a li(some existing item) + li(some new item)

find(
  <ul>
    <li>some item</li>
    <li>
      <ul>
        <li>some descendent item</li>
      </ul>
    </li>
  </ul>
)
ul
ul li(some item)
ul li(some item) + li
ul li(some item) + li ul
ul li(some item) + li ul li(some descendent item)

*/

export function hasChildElements(vFragment) {
  if (typeof vFragment === 'string') {
    return false;
  }

  if (vFragment.children.length === 0) {
    return false;
  }

  let hasChildElements = false;
  for (const childFragment of vFragment.children) {
    if (typeof childFragment !== 'string') {
      hasChildElements = true;
    }
  }

  return hasChildElements;
}

export function getVirtualPaths(vFragment) {
  const paths = [];

  function walk(childFragment, accumulator) {
    const path = [...accumulator, childFragment];
    if (typeof childFragment === 'string' || !childFragment.children.length) {
      paths.push(path);
      return;
    }

    childFragment.children.map((child) => {
      walk(child, path);
    });
  }

  walk(vFragment, []);

  return paths;
}










export function finder(vFragment, contextElement) {
  let c = contextElement === undefined ? document : contextElement;

  if (c === null) {
    return [];
  }

  if (typeof vFragment === 'string') {
    return [];
  }

  const foundElements = findElementsByVirtualFragment(vFragment, c);

  if (!foundElements.length) {
    return [];
  }

  if (!hasChildElements(vFragment)) {
    return foundElements;
  }

  let results = [];

  for (const foundElement of foundElements) {
    for (const fragmentChild of vFragment.children) {
      const childElements = finder(fragmentChild, foundElement);
      results = results.concat(childElements);
    }
  }

  return results;
}









export function findElementsByVirtualFragment(vFragment, parentElement = null) {
  if (parentElement === null) {
    return [];
  }

  // a string fragment is a text node, not an element, and we don't want that
  if (typeof vFragment === 'string') {
    return [];
  }

  const attributeKeys = Object.keys(vFragment.attributes);
  const textContent = getTextContent(vFragment);

  /*
    If an element has (a) only an ID and (b) no text, it receives special treatment,
    because `getElementById` is more performant than an XPath query.
  */
  if (attributeKeys.length === 1 && attributeKeys[0] === 'id' && textContent === '') {
    return [document.getElementById(vFragment.attributes.id)];
  }

  const xpathQuery = [];
  for (const attrKey of attributeKeys) {
    xpathQuery.push(`@${attrKey}="${vFragment.attributes[attrKey]}"`);
  }

  if (textContent) {
    xpathQuery.push(`text()="${textContent}"`);
  }

  let results;

  if (xpathQuery.length === 0) {
    results = findElementByXPath(`//${vFragment.tagName}`, parentElement);
  } else {
    results = findElementByXPath(`//${vFragment.tagName}[${xpathQuery.join(' and ')}]`, parentElement);
  }

  return results.filter((r) => r !== null);
}

export function collectElements(vFragment, parentElement) {
  let results = [];

  const queryResults = findElementsByVirtualFragment(vFragment, parentElement);

  if (vFragment.children?.length) {
    for (const childFragment of vFragment.children) {
      let childResults = [];

      console.log('iterating through child fragment:');
      console.log(childFragment);

      for (const queryResult of queryResults) {
        console.log('iterating through query result:');
        console.log(queryResult);

        const elements = collectElements(childFragment, queryResult);

        console.log('found child elements:');
        console.log(elements);

        if (elements.length) {
          childResults = childResults.concat(elements);
        }
      }

      if (childResults.length) {
        results.push(queryResults);
        results.push(childResults);
      }
    }
  } else {
    results.push(queryResults);
  }

  return results.flat();
}

export function getFragmentLeaves(vFragment, results = []) {
  if (typeof vFragment === 'string') {
    results.push(vFragment);
  } else if (vFragment.children.length === 0) {
    results.push(vFragment);
  } else {
    for (const child of vFragment.children) {
      getFragmentLeaves(child, results);
    }
  }

  return results;
}












/*/

// end of list
(
  <ul>
    ...
    <li>a new item</li>
  </ul>
)

// beginning of list
(
  <ul>
    <li>an item</li>
    ...
  </ul>
)

// next sibling
(
  <ul>
    <li>an existing node</li>
    <li>a new node</li>
  </ul>
)

// previous sibling
(
  <ul>
    <li>a new node</li>
    <li>an existing node</li>
  </ul>
)

// nth in list, one variation
(
  <ul>
    <li nth-6>a new node</li>
  </ul>
)

//
(
  <ul>
    <li>a new node</li>
  </ul>
)

*/