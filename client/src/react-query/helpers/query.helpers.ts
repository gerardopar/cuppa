// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const constructQueryParams = (params: any) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return queryString;
};

export const constructQueryParamsPaginated = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any,
  pageParam: number | string | undefined
) => {
  const queryString = new URLSearchParams(
    Object.entries({
      ...params,
      page: String(pageParam),
    }).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return queryString;
};
