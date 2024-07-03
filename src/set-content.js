import { convertVirtualPathToXPath, findElementsByXPath, getTextContent, getVirtualPaths } from "./utils";

export function setContent(virtualFragment) {
  const virtualPaths = getVirtualPaths(virtualFragment);

  for (const virtualPath of virtualPaths) {
    const xPath = convertVirtualPathToXPath(virtualPath, { exclude: 'content' });
    const elements = findElementsByXPath(xPath, document);

    for (const element of elements) {
      if (!element || element.nodeType !== 1) {
        break;
      }

      const leaf = virtualPath[virtualPath.length - 2];

      if (leaf && leaf.fragment && typeof leaf.fragment !== 'string') {
        const textContent = getTextContent(leaf.fragment);

        element.innerText = textContent;
      }
    }
  }
}
