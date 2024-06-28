
export function setAttributes(element) {
  if (typeof element === 'string') {
    return;
  }

  const targetElement = document.getElementById(element.attributes.id);
  if (targetElement) {
    for (const attr in element.attributes) {

      if (['value'].includes(attr)) {
        // @ts-ignore
        targetElement[attr] = element.attributes[attr];
      }

      targetElement.setAttribute(attr, element.attributes[attr]);
    }
  }

  element.children.forEach(setAttributes);
}
