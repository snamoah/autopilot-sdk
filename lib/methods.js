import utils, { parse } from './utils';

export const save = function save({ email, id, ...data }) {
  if (!email && !id) {
    throw new Error('Contact data to be saved must have an `email` or `id`');
  }

  const path = 'contact';
  // parse the data
  // set email or contact_id
  const token = this.apiKey;
  const customData = parse(data);

  const options = {
    token,
    contact: {
      contact_id: id,
      Email: email,
      custom: customData,
    },
  };

  return utils.request('post', path, options);
};

export const methods = apiKey => ({
  save: save.bind({ apiKey }),
});
