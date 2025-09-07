export type ChatStatus = 'online' | 'offline' | 'busy' | 'away'

export type ChatContact = {
  id: number
  fullName: string
  role: string
  about: string
  avatar: string
  status: ChatStatus
}

export type ChatMessage = {
  message: string
  time: string
  senderId: number
  feedback: {
    isSent: boolean
    isDelivered: boolean
    isSeen: boolean
  }
}

export type Chat = {
  id: number
  userId: number
  unseenMsgs: number
  messages: ChatMessage[]
}

// ℹ️ This is chat type received in response of user chat
export type ChatOut = {
  id: Chat['id']
  unseenMsgs: Chat['unseenMsgs']
  messages: ChatMessage[]

  // @ts-expect-error Indexed Access Types
  lastMessage: ChatMessage[number]
}

export type ChatContactWithChat = {
  chat: ChatOut
} & ChatContact
