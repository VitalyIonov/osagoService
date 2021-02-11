export const getAddress = (params, stopper) => ({
  methodUrl: 'api/users',
  params: {
    ...params,
    page: 1
  },
  stopper
});
