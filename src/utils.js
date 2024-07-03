
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

export function getTextContent(virtualFragment) {
  if (typeof virtualFragment === 'string') {
    return '';
  }

  let str = '';
  for (const child of virtualFragment.children) {
    if (typeof child === 'string') {
      str += child;
    } else {
      return '';
    }
  }

  return str;
}

export function convertElementNodeToHTML(obj) {
  let node;

  if (typeof obj === 'string') {
    node = document.createTextNode(obj);
  } else {
    node = document.createElement(obj.tagName);

    for (const attr in obj.attributes) {
      node.setAttribute(attr, obj.attributes[attr]);
    }

    for (const event in obj.events) {
      // @ts-ignore
      node[event] = obj.events[event];
    }

    node['key'] = obj.key;

    for (const childElementNode of obj.children) {
      node.appendChild(convertElementNodeToHTML(childElementNode));
    }
  }

  return node;
}

export function captureAppendees(
  virtualFragment,
  contextNode = document,
  results = [],
) {
  if (typeof virtualFragment === 'string') {
    if (contextNode !== null) {
      results.push({
        target: contextNode,
        appendee: virtualFragment,
        relationship: 'child',
      });
    }

    return results;
  }

  const targetElement = contextNode.querySelector(`#${virtualFragment.attributes.id}`);
  if (targetElement) {
    for (const child of virtualFragment.children) {
      results = captureAppendees(child, targetElement, results);
    }

  } else {
    if (contextNode) {
      results.push({
        target: contextNode,
        appendee: virtualFragment,
        relationship: 'child',
      });
    }
  }

  return results;
}

export function findElementsByXPath(xpath, contextNode) {
  const result = document.evaluate(
    xpath,
    contextNode,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );

  const nodes = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    nodes.push(result.snapshotItem(i));
  }
  return nodes;
}

export function findElementsByVirtualFragment(vFragment, contextElement) {
  if (!contextElement) {
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
    results = findElementsByXPath(`//${vFragment.tagName}`, contextElement);
  } else {
    results = findElementsByXPath(`//${vFragment.tagName}[${xpathQuery.join(' and ')}]`, contextElement);
  }

  return results.filter((r) => r !== null);
}

export function getVirtualPaths(vFragment) {
  const paths = [];

  function walk(childFragment, accumulator, relationship = 'root') {
    const path = [...accumulator, { fragment: childFragment, relationship }];

    if (typeof childFragment === 'string' || !childFragment.children.length) {
      paths.push(path);
      return;
    }

    childFragment.children.forEach((child, i) => {
      if (i === 0) {
        walk(child, path, 'child');
        return;
      }

      for (let x = 0; x < i; x++) {
        path.push({
          fragment: childFragment.children[x],
          relationship: x === 0 ? 'child' : 'next',
        })
      }

      walk(child, path, 'next');
    });
  }

  walk(vFragment, []);

  return paths;
}

export function convertVirtualPathToXPath(virtualPath, options = {}) {
  const subPaths = [];

  virtualPath.forEach((subPath, i) => {
    const vFragment = subPath.fragment;

    if (typeof vFragment === 'string') {
      return;
    }

    const attributeKeys = Object.keys(vFragment.attributes);
    const textContent = getTextContent(vFragment);

    const xpathQuery = [];

    if (options.exclude !== 'attributes') {
      for (const attrKey of attributeKeys) {
        if (typeof vFragment.attributes[attrKey] === 'function') {
          continue;
        }

        xpathQuery.push(`@${attrKey}="${vFragment.attributes[attrKey]}"`);
      }
    }

    if (options.exclude !== 'content') {
      if (textContent) {
        xpathQuery.push(`text()="${textContent}"`);
      }
    }

    let prefix = '';
    if (subPath.relationship === 'next') {
      prefix = 'following-sibling::'
    }

    if (xpathQuery.length) {
      subPaths.push(`${prefix}${vFragment.tagName}[${xpathQuery.join(' and ')}]`);
    } else {
      subPaths.push(`${prefix}${vFragment.tagName}`);
    }
  });

  return `//${subPaths.join('//')}`;
}
