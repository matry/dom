import { convertElementNodeToHTML } from './utils';

export function write(target, element) {
  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.getElementById(target);
  } else {
    targetElement = target;
  }

  if (!targetElement) {
    return;
  }

  targetElement?.appendChild(convertElementNodeToHTML(element));
}
