import type { VirtualNode } from '../types';

export function setAttributes(virtualNode: VirtualNode): void {
  if (typeof virtualNode === 'string') {
    return;
  }

  const targetElement = document.getElementById(virtualNode.attributes.id);
  if (targetElement) {
    for (const attr in virtualNode.attributes) {
      if (['value'].includes(attr)) {
        targetElement[attr] = virtualNode.attributes[attr];
      }

      targetElement.setAttribute(attr, virtualNode.attributes[attr]);
    }
  }

  virtualNode.children.forEach(setAttributes);
}
