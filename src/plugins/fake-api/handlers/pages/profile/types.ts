export type ProfileChip = {
  title: string
  color: string
}

export type ProfileTabCommon = {
  icon: string
  value: string
  property: string
}
export type ProfileTeams = ProfileTabCommon & { color: string }

export type ProfileConnections = {
  name: string
  avatar: string
  isFriend: boolean
  connections: string
}

export type ProfileAvatarGroup = {
  name: string
  avatar: string
}

export type ProfileTeamsTech = {
  title: string
  avatar: string
  members: number
  chipText: string
  ChipColor: string
}

export type ConnectionsTab = {
  name: string
  tasks: string
  avatar: string
  projects: string
  connections: string
  designation: string
  isConnected: boolean
  chips: ProfileChip[]
}

export type ProfileTab = {
  teams: ProfileTeams[]
  about: ProfileTabCommon[]
  contacts: ProfileTabCommon[]
  overview: ProfileTabCommon[]
  teamsTech: ProfileTeamsTech[]
  connections: ProfileConnections[]
}

export type ProfileHeader = {
  fullName: string
  coverImg: string
  location: string
  profileImg: string
  joiningDate: string
  designation: string
  designationIcon?: string
}

export type ProjectTableRow = {
  id: number
  date: string
  name: string
  leader: string
  status: number
  avatar?: string
  avatarGroup: string[]
  avatarColor?: string
}

export type ProjectsTab = {
  hours: string
  tasks: string
  title: string
  budget: string
  client: string
  avatar: string
  members: string
  chipText: string
  comments: number
  deadline: string
  startDate: string
  totalTask: number
  budgetSpent: string
  description: string
  chipColor: string
  completedTask: number
  avatarColor?: string
  avatarGroup: ProfileAvatarGroup[]
}

export type TeamsTab = {
  title: string
  avatar: string
  description: string
  extraMembers?: number
  chips: ProfileChip[]
  avatarGroup: ProfileAvatarGroup[]
}
