
export const jsx = {
  component(component, props, ...children) {
    if (!props) {
      props = {};
    }

    if (typeof component === 'function') {
      return component({
        ...props,
        children: children.flat(Infinity),
      });
    }

    const element = {
      tagName: component,
      key: null,
      attributes: {},
      events: {},
      children: [],
    };

    for (const k in props) {
      if (typeof props[k] === 'function') {
        element.events[k] = props[k];
      } else if (k === 'key') {
        element.key = props[k];
      } else {
        element.attributes[k] = props[k];
      }
    }

    element.children = children.flat(Infinity).map((c) => {
      if (typeof c === 'object' && c.hasOwnProperty('tagName')) {
        return c;
      }

      return c.toString();
    });

    return element;
  }
}
