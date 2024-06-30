import type { VirtualNode } from '../types';
import { findElementByXPath, getTextContent } from './utils';

export function empty(virtualNode: VirtualNode, parent: VirtualNode | null = null): void {
  let targetElement;

  if (typeof virtualNode === 'string') {
    targetElement = findElementByXPath(`//*[text()="${virtualNode}"]`);

    if (targetElement.length) {
      for (const el of targetElement) {
        el?.parentElement?.replaceChildren();
      }
    }
    return;
  }

  if (virtualNode.children.length) {
    for (const child of virtualNode.children) {
      empty(child, virtualNode);
    }
    return;
  }

  const xpathQuery: string[] = [];
  for (const attr in virtualNode.attributes) {
    xpathQuery.push(`@${attr}="${virtualNode.attributes[attr]}"`);
  }

  const textContent = getTextContent(virtualNode);
  if (textContent) {
    xpathQuery.push(`text()="${textContent}"`);
  }

  const xPathStr = ['/'];
  if (parent !== null && typeof parent !== 'string') {
    if (parent.attributes.id) {
      xPathStr.push(`${parent.tagName}[@id="${parent.attributes.id}"]`);
    }
  }

  xPathStr.push(`${virtualNode.tagName}[${xpathQuery.join(' and ')}]`)

  targetElement = findElementByXPath(xPathStr.join('/'));

  for (const targetEl of targetElement) {
    if (targetEl instanceof HTMLElement) {
      targetEl.replaceChildren();
    }
  }
}
