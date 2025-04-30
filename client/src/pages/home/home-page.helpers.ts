export enum NewsCategoriesEnum {
  mostTrendingNews = "Most Trending News",
  politics = "Politics",
  healthLifestyle = "Health & Lifestyle",
  sports = "Sports",
  business = "Business & Finance",
  technology = "Technology",
  entertainment = "Entertainment",
  scienceEnvironment = "Science & Environment",
  world = "World News",
  opinion = "Opinion & Editorial",
  culture = "Culture & Arts",
  travel = "Travel",
  food = "Food & Drink",
}

export const NewsCategoriesArray: NewsCategoriesEnum[] = Object.values(
  NewsCategoriesEnum
) as NewsCategoriesEnum[];
