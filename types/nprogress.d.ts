declare module 'nprogress' {
  type NProgressStatic = {
    configure: (options: NProgressOptions) => NProgressStatic
    start: () => NProgressStatic
    done: () => NProgressStatic
    set: (n: number) => NProgressStatic
    inc: (amount?: number) => NProgressStatic
    status: number | null
    isStarted: () => boolean
    remove: () => void
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
  }

  const nprogress: NProgressStatic
  export default nprogress
}
