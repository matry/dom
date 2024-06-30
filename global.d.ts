
declare global {
  module JSX {
    type IntrinsicElements = Record<
      keyof HTMLElementTagNameMap,
      Record<string, any>
    >
  }
}

export {}
