import type { AppAbility } from './AppAbility'
import { useAbility } from '@casl/vue'

export const useAppAbility = () => useAbility<AppAbility>()
