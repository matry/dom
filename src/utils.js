
export function getTextContent(element) {
  if (typeof element === 'string') {
    return null;
  }

  let str = '';
  for (const child of element.children) {
    if (typeof child === 'string') {
      str += child;
    } else {
      break;
    }
  }

  return str || null;
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

    for (const childElementNode of obj.children) {
      node.appendChild(convertElementNodeToHTML(childElementNode));
    }
  }

  return node;
}

export function captureAppendees(
  obj,
  parentNode = null,
  results = [],
) {
  if (typeof obj === 'string') {
    if (parentNode !== null) {
      results.push({
        target: parentNode,
        appendee: obj,
        relationship: 'child',
      });
    }

    return results;
  }

  let targetElement;

  if (parentNode) {
    targetElement = parentNode.querySelector(`#${obj.attributes.id}`);
  } else {
    targetElement = document.getElementById(obj.attributes.id);
  }

  if (targetElement) {
    for (const child of obj.children) {
      results = captureAppendees(child, targetElement, results);
    }

  } else {
    if (parentNode) {
      results.push({
        target: parentNode,
        appendee: obj,
        relationship: 'child',
      });
    }
  }

  return results;
}

export function findElementByXPath(xpath) {
  const result = document.evaluate(
    xpath,
    document,
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
