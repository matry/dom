import { findElementByXPath, getTextContent } from './utils';

export function empty(element) {
  let targetElement;

  if (typeof element === 'string') {
    targetElement = findElementByXPath(`//*[text()="${element}"]`);

    if (targetElement.length) {
      for (const el of targetElement) {
        el?.parentElement?.replaceChildren();
      }
    }
    return;
  }

  if (element.children.length) {
    for (const child of element.children) {
      empty(child);
    }
    return;
  }

  const xpath = [];
  for (const attr in element.attributes) {
    xpath.push(`@${attr}="${element.attributes[attr]}"`);
  }

  const textContent = getTextContent(element);
  if (textContent) {
    xpath.push(`text()="${textContent}"`);
  }

  targetElement = findElementByXPath(`//${element.tagName}[${xpath.join(' and ')}]`);

  for (const targetEl of targetElement) {
    if (targetEl instanceof HTMLElement) {
      targetEl.replaceChildren();
    }
  }
}