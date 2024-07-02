import { findElementsByVirtualFragment } from './utils';

export function addEventListeners(virtualFragment) {
  if (!virtualFragment || typeof virtualFragment === 'string') {
    return;
  }

  const fragmentEvents = Object.entries(virtualFragment.events);
  if (fragmentEvents.length) {
    const elements = findElementsByVirtualFragment(virtualFragment, document);
    for (const element of elements) {
      for (const [key, fn] of fragmentEvents) {
        element[key] = fn;
      }
    }
  }

  virtualFragment.children.forEach(addEventListeners);
}
