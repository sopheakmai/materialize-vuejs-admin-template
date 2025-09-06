import type { AbilityClass } from '@casl/ability'
import { Ability } from '@casl/ability'

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage'

export type Subjects = 'Auth' | 'Admin' | 'AclDemo' | 'all'

export type AppAbility = Ability<[Actions, Subjects]>

export const AppAbility = Ability as AbilityClass<AppAbility>

export type UserAbility = {
  action: Actions
  subject: Subjects
}
