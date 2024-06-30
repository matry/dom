import type { Component, VirtualNode } from '../types';

export const jsx = {
  component(
    component: string | Component,
    props: Record<string, any> | null,
    ...children: VirtualNode[]
  ): VirtualNode {
    if (!props) {
      props = {};
    }

    if (typeof component === 'function') {
      return component({
        ...props,
        children: children.flat(Infinity),
      });
    }

    const element: VirtualNode = {
      tagName: component,
      attributes: {},
      events: {},
      children: [],
    };

    for (const k in props) {
      if (typeof props[k] === 'function') {
        element.events[k] = props[k];
      } else {
        element.attributes[k] = props[k];
      }
    }

    element.children = children.flat(Infinity).map((c) => {
      // in some cases this value can be a number, but we don't want to add that to the type definition
      return typeof c === 'object' ? c : c.toString();
    });

    return element;
  }
}
