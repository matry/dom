import { captureAppendees, convertVirtualFragmentToHtml } from './utils';

export function append(virtualFragment) {
  const appendees = captureAppendees(virtualFragment);

  for (const appendee of appendees) {
    switch (appendee.relationship) {
      case 'child':
        window.requestAnimationFrame(() => {
          appendee.target.appendChild(convertVirtualFragmentToHtml(appendee.appendee));
        });
        break;
      case 'next':
        // TODO: implement
        break;
      case 'previous':
        // TODO: implement
        break;
      default:
        break;
    }
  }
}
