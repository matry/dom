import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function empty(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);
  const xPaths = virtualPaths.map(convertVirtualPathToXPath);

  for (const xPath of xPaths) {
    const elements = findElementsByXPath(xPath, document);
    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      element.replaceChildren();
    }
  }
}
