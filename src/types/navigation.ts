
export type RootStackParamList = {
  Home: undefined
  MovieDetailScreen: { id: number };
  InApp: { screen?: "Home" | "Search"; params?: any } | undefined;
  Search: {query: string}
  Login: undefined
};
