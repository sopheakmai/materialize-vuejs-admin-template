// 👉 Help center
export type HelpCenterSubcategoryArticles = {
  slug: string
  title: string
  content: string
}
export type HelpCenterAllCategoryArticles = {
  title: string
  icon: string
  articles: { title: string }[]
}
export type HelpCenterSubcategories = {
  icon: string
  slug: string
  title: string
  articles: HelpCenterSubcategoryArticles[]
}
export type HelpCenterCategories = {
  icon: string
  slug: string
  title: string
  avatarColor: string
  subCategories: HelpCenterSubcategories[]
}
export type HelpCenterArticlesOverview = {
  img: string
  slug: string
  title: string
  subtitle: string
}

export type HelpCenterArticle = {
  title: string
  lastUpdated: string
  productContent: string
  productImg: string
  checkoutContent: string
  checkoutImg: string
  articleList: string[]
}
