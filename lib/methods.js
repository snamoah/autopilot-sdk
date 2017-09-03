import utils, { parse, getVariables } from './utils';

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


/**
 * @function get
 *
 * @description - Serves as a getter method for autopilot contexts
 *
 * @param {String}/[String] args - Emails or ids or list of emails/ids
 * @return {Promise}
 */
export const get = function get(args) {
  const { singleBasePath, token } = getVariables(this);
  const options = { token };

  if (Array.isArray(args)) {
    const batchRequestPromise = args.map((emailOrId) => {
      const encodedURIComponent = encodeURIComponent(emailOrId);
      const path = `${singleBasePath}/${encodedURIComponent}`;
      return utils.request('get', path, options);
    });

    return Promise.all(batchRequestPromise);
  }

  try {
    const encodedURIComponent = encodeURIComponent(args);
    const path = `${singleBasePath}/${encodedURIComponent}`;
    return utils.request('get', path, options);
  } catch (err) {
    throw new Error(err);
  }
};

export const del = function (emailOrId) {
  const { singleBasePath, token } = getVariables(this);
  const options = { token };

  const encodedURIComponent = encodeURIComponent(emailOrId);
  const path = `${singleBasePath}/${encodedURIComponent}`;
  return utils.request('delete', path, options);
};

export const unsubscribe = function unsubscribe(emailOrId) {
  const { singleBasePath, token } = getVariables(this);
  const options = { token };

  const encodedURIComponent = encodeURIComponent(emailOrId);
  const path = `${singleBasePath}/${encodedURIComponent}/unsubscribe`;
  return utils.request('post', path, options);
};

export const methods = (thisArg) => {
  /** setup `this` with values:
   * - id
   * - parent
   * - method
   * - single
   */
  console.log('....');
  return {
    save: save.bind(thisArg),
    get: get.bind(thisArg),
    delete: del.bind(thisArg),
    unsubscribe: unsubscribe.bind(thisArg),
  };
};
