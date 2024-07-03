import { convertVirtualPathToXPath, findElementsByXPath, getVirtualPaths } from './utils';

export function swap(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);

  if (virtualPaths.length < 2) {
    console.warn('approximately 2 leaf nodes are required for swap');
    return;
  }

  const xPaths = virtualPaths.map(convertVirtualPathToXPath);
  const elementLists = xPaths.map((xPath) => {
    return findElementsByXPath(xPath, document);
  });

  if (elementLists.length < 2) {
    return;
  }

  const l = Math.min(elementLists[0].length, elementLists[1].length);
  for (let i = 0; i < l; i++) {
    const elementA = elementLists[0][i];
    const elementB = elementLists[1][i];

    const cloneA = elementA.cloneNode(true);
    const cloneB = elementB.cloneNode(true);

    elementA.replaceWith(cloneB);
    elementB.replaceWith(cloneA);
  }
}
