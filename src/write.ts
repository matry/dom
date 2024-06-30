import type { VirtualNode } from '../types';
import { convertElementNodeToHTML } from './utils';

export function write(target: Node | string, virtualNode: VirtualNode): void {
  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.getElementById(target);
  } else {
    targetElement = target;
  }

  if (!targetElement) {
    return;
  }

  targetElement?.appendChild(convertElementNodeToHTML(virtualNode));
}
