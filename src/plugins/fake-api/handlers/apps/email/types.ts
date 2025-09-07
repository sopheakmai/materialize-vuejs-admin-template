export type EmailFolder = 'inbox' | 'sent' | 'draft' | 'spam'
export type EmailFilter = EmailFolder | 'trashed' | 'starred'
export type EmailLabel = 'personal' | 'company' | 'important' | 'private'

export type EmailTo = {
  email: string
  name: string
}

export type EmailFrom = {
  email: string
  name: string
  avatar: any
}

export type EmailAttachment = {
  fileName: string
  thumbnail: any
  url: string
  size: string
}

/*
  - You can have draft mail in your inbox
    - We can have flag isDraft for mail
  - You can't move sent mail to inbox
  - You can move sent mail to inbox

  --- above are gmail notes

  - We will provide inbox, spam & sent as folders
    - You can't move any mail in sent folder. Sent mail can be deleted or retrieved back
  - We will provide isDraft, isSpam, isTrash as flags
  - draft is flag
  - trash is flag
  - spam email can be moved to inbox only
  - We will provide isDeleted flag

  === this is too confusing 😔

  // this is final now 💯
  folders => inbox, sent, draft, spam
  flags: starred, trash
*/

export type Email = {
  id: number
  to: EmailTo[]
  from: EmailFrom
  subject: string
  cc: string[]
  bcc: string[]
  message: string
  attachments: EmailAttachment[]
  time: string
  replies: Email[]

  labels: EmailLabel[]

  folder: EmailFolder

  // Flags 🚩
  isRead: boolean
  isStarred: boolean
  isDeleted: boolean
}

export type FetchEmailsPayload = {
  q?: string
  filter?: EmailFilter
  label?: EmailLabel
}
