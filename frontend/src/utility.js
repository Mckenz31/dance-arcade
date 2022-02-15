import queryString from 'query-string';

export const getQueryParams = (string) => {
  return queryString.parse(string);
};
