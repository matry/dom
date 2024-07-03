import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function setAttributes(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);

  for (const virtualPath of virtualPaths) {
    const xPath = convertVirtualPathToXPath(virtualPath, { exclude: 'attributes' });
    const elements = findElementsByXPath(xPath, document);

    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      const leaf = virtualPath[virtualPath.length - 1];

      if (leaf && leaf.fragment && typeof leaf.fragment !== 'string') {
        for (const attrKey in leaf.fragment.attributes) {
          const value = leaf.fragment.attributes[attrKey];

          if (typeof value === 'function' || attrKey === 'key') {
            element[attrKey] = value;
          } else {
            element.setAttribute(attrKey, value);

            if (attrKey in element) {
              element[attrKey] = value;
            }
          }
        }
      }
    }
  }
}
