import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function removeAttributes(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);

  for (const virtualPath of virtualPaths) {
    const xPath = convertVirtualPathToXPath(virtualPath);
    const elements = findElementsByXPath(xPath, document);
    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      const leaf = virtualPath[virtualPath.length - 1];

      if (leaf?.fragment && typeof leaf.fragment !== 'string') {
        for (const attrKey in leaf.fragment.attributes) {
          const value = leaf.fragment.attributes[attrKey];

          if (typeof value === 'function' || attrKey === 'key') {
            element[attrKey] = null;
          } else {
            element.removeAttribute(attrKey);
          }
        }
      }
    }
  }
}
