
export type Component = (props: Record<string, any>) => any

export type VirtualNode = string | {
  tagName: string,
  attributes: {[key:string]:string},
  events: {[key:string]: (...args: any[]) => any},
  children: VirtualNode[],
}

export type VirtualNodeAppendee = {
  target: Element,
  appendee: VirtualNode,
  relationship: 'next' | 'previous' | 'child',
}

export {}
