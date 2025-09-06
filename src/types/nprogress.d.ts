/*
  This is a shims file to declare the nprogress module without TypeScript errors.
  It allows us to use nprogress without installing @types/nprogress.
*/
declare module 'nprogress' {
  type NProgressStatic = {
    start: () => void
    done: () => void
    inc: (amount?: number) => void
    set: (n: number) => void
    status: number | null
    configure: (options: NProgressOptions) => void
  }

  type NProgressOptions = {
    minimum?: number
    easing?: string
    speed?: number
    trickle?: boolean
    trickleSpeed?: number
    showSpinner?: boolean
    parent?: string
    template?: string
    ease?: (n: number) => number
  }

  const nprogress: NProgressStatic
  export default nprogress
}
