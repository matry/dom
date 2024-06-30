import type { VirtualNode } from '../types';
import { findElementByXPath, getTextContent } from './utils';

export function remove(virtualNode: VirtualNode): void {
  let targetElement;

  if (typeof virtualNode === 'string') {
    targetElement = findElementByXPath(`//*[text()="${virtualNode}"]`);

    if (targetElement.length) {
      for (const el of targetElement) {
        el?.parentElement?.removeChild(el);
      }
    }
    return;
  }

  if (virtualNode.children.length) {
    for (const child of virtualNode.children) {
      remove(child);
    }
    return;
  }

  const xpath: string[] = [];
  for (const attr in virtualNode.attributes) {
    xpath.push(`@${attr}="${virtualNode.attributes[attr]}"`);
  }

  const textContent = getTextContent(virtualNode);
  if (textContent) {
    xpath.push(`text()="${textContent}"`);
  }

  targetElement = findElementByXPath(`//${virtualNode.tagName}[${xpath.join(' and ')}]`);

  for (const targetEl of targetElement) {
    targetEl?.parentElement?.removeChild(targetEl);
  }
}
