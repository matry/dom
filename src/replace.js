import { convertVirtualFragmentToHtml, findElementsByVirtualFragment } from './utils';

export function replace(virtualFragment) {
  if (!virtualFragment || typeof virtualFragment === 'string') {
    return;
  }

  const elements = findElementsByVirtualFragment(virtualFragment, document);

  for (const element of elements) {
    if (typeof element === 'string') {
      return;
    }

    const childElements = virtualFragment.children.map(convertVirtualFragmentToHtml);
    element.replaceChildren(...childElements);
  }
}
