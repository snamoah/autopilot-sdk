import utils, { parse } from './utils';

export const save = function save(data) {
  let path;
  // set email or contact_id
  const token = this.apiKey;
  const options = { token };

  if (Array.isArray(data)) {
    path = 'contacts';
    options[path] = data.map(({ email, id, ...rest }) => {
      if (!email && !id) {
        throw new Error('Contact data to be saved must have an `email` or `id`');
      }
      return {
        Email: email,
        contact_id: id,
        custom: parse(rest),
      };
    });
  } else {
    path = 'contact';
    const { email, id, ...rest } = data;
    if (!email && !id) {
      throw new Error('Contact data to be saved must have an `email` or `id`');
    }

    options[path] = {
      contact_id: id,
      Email: email,
      custom: parse(rest),
    };
  }

  // const {
  //   Twitter,
  //   FirstName,
  //   LastName,
  //   Salutation,
  //   Company,
  //   NumberOfEmployees,
  //   Title,
  //   Industry,
  //   Phone,
  //   MobilePhone,
  //   Fax,
  //   Website,
  //   MailingStreet,
  //   LeadSource,
  //   Status } = data;

  return utils.request('post', path, options);
};

// export const get = function get(args) {
//   const previousId = this.id;
//   if ()
//   console.log(args);
// };

export const methods = apiKey => ({
  save: save.bind({ apiKey }),
});
