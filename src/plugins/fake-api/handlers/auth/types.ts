export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage'

export type Subjects = 'Auth' | 'Admin' | 'AclDemo' | 'all'

export type UserAbilityRule = {
  action: Actions
  subject: Subjects
}

export type User = {
  id: number
  fullName?: string
  username: string
  password: string
  avatar?: string
  email: string
  role: string
  abilityRules: UserAbilityRule[]
}

export type UserOut = {
  userAbilityRules: User['abilityRules']
  accessToken: string
  userData: Omit<User, 'abilities' | 'password'>
}

export type LoginResponse = {
  accessToken: string
  userData: User
  userAbilityRules: User['abilityRules']
}

export type RegisterResponse = {
  accessToken: string
  userData: User
  userAbilityRules: User['abilityRules']
}
