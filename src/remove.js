import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function remove(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);
  const xPaths = virtualPaths.map(convertVirtualPathToXPath);

  for (const xPath of xPaths) {
    const elements = findElementsByXPath(xPath);
    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      element.remove();
    }
  }
}
