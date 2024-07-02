import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function removeEventListeners(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);

  for (const virtualPath of virtualPaths) {
    const xPath = convertVirtualPathToXPath(virtualPath);
    const elements = findElementsByXPath(xPath, document);
    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      const leaf = virtualPath[virtualPath.length - 1];

      if (leaf.fragment && typeof leaf.fragment !== 'string') {
        for (const eventKey in leaf.fragment.events) {
          const value = leaf.fragment.events[eventKey];

          if (typeof value === 'function') {
            element[eventKey] = null;

            const eventName = eventKey.substring(2)
            element.removeEventListener(eventName, value);
          }
        }
      }
    }
  }
}
