import type { ability } from './ability'

declare module 'vue' {
  type ComponentCustomProperties = {
    $ability: typeof ability
    $can: (this: this, ...args: Parameters<this['$ability']['can']>) => boolean
  }
}
