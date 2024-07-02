import { findElementsByVirtualFragment, hasChildElements } from './utils';

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
