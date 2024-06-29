import { findElementByXPath, getTextContent } from './utils';

export function empty(element, parent) {
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
      empty(child, element);
    }
    return;
  }

  const xpathQuery = [];
  for (const attr in element.attributes) {
    xpathQuery.push(`@${attr}="${element.attributes[attr]}"`);
  }

  const textContent = getTextContent(element);
  if (textContent) {
    xpathQuery.push(`text()="${textContent}"`);
  }

  const xPathStr = ['/'];
  if (parent) {
    if (parent.attributes.id) {
      xPathStr.push(`${parent.tagName}[@id="${parent.attributes.id}"]`);
    }
  }

  xPathStr.push(`${element.tagName}[${xpathQuery.join(' and ')}]`)

  targetElement = findElementByXPath(xPathStr.join('/'));

  for (const targetEl of targetElement) {
    if (targetEl instanceof HTMLElement) {
      targetEl.replaceChildren();
    }
  }
}
