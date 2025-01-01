export interface TinaConnectionClientPageProps<TData, TVariables> {
  data: TData;
  variables: TVariables;
  query: string;
}

export interface TinaQueryClientPageProps<TData> {
  data: TData;
  variables: {
    relativePath: string;
  };
  query: string;
}
