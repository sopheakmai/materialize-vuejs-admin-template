import type { AppAbility } from './AppAbility'

declare module 'vue' {
  type ComponentCustomProperties = {
    $ability: AppAbility
    $can: (this: this, ...args: Parameters<this['$ability']['can']>) => boolean
  }
}
