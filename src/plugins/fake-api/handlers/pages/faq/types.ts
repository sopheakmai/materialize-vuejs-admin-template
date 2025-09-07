export type Faq = {
  question: string
  answer: string
}

export type FaqCategory = {
  faqTitle: string
  faqIcon: string
  faqSubtitle: string
  faqs: Faq[]
}
