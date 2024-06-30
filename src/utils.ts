import type { VirtualNode, VirtualNodeAppendee } from '../types';

export function getTextContent(element: VirtualNode): string | null {
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

export function convertElementNodeToHTML(virtualNode: VirtualNode) {
  let node;

  if (typeof virtualNode === 'string') {
    node = document.createTextNode(virtualNode);
  } else {
    node = document.createElement(virtualNode.tagName);

    for (const attr in virtualNode.attributes) {
      node.setAttribute(attr, virtualNode.attributes[attr]);
    }

    for (const event in virtualNode.events) {
      // @ts-ignore
      node[event] = obj.events[event];
    }

    for (const childElementNode of virtualNode.children) {
      node.appendChild(convertElementNodeToHTML(childElementNode));
    }
  }

  return node;
}

export function captureAppendees(
  virtualNode: VirtualNode,
  parentElement: Element | null = null,
  results: VirtualNodeAppendee[] = [],
) {
  if (typeof virtualNode === 'string') {
    if (parentElement !== null) {
      results.push({
        target: parentElement,
        appendee: virtualNode,
        relationship: 'child',
      });
    }

    return results;
  }

  let targetElement;

  if (parentElement) {
    targetElement = parentElement.querySelector(`#${virtualNode.attributes.id}`);
  } else {
    targetElement = document.getElementById(virtualNode.attributes.id);
  }

  if (targetElement) {
    for (const child of virtualNode.children) {
      results = captureAppendees(child, targetElement, results);
    }

  } else {
    if (parentElement) {
      results.push({
        target: parentElement,
        appendee: virtualNode,
        relationship: 'child',
      });
    }
  }

  return results;
}

export function findElementByXPath(xpath: string): Node[] {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );

  const nodes: Node[] = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    const item = result.snapshotItem(i);
    if (item !== null) {
      nodes.push(item);
    }
  }
  return nodes;
}
