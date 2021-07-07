export const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const ERROR = {
  NOT_EXIST: { error: 'Such product does not exits' },
  BAD_REQUEST: { error: 'Request is wrong' },
  WRONG: { error: 'Something went wrong' },
  INTERNAL_ERROR: { error: 'Server error' },
};
