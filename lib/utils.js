import axios from 'axios';

const VERSION = 'v1';
const ENDPOINT = `https://api2.autopilothq.com/${VERSION}/`;

/**
 * @function isDate
 */
export const isDate = value => !isNaN(Date.parse(value));
export const isFloat = value => Number(value) === value && value % 1 !== 0;
export const hyphenate = str => str.trim().replace(/\s/g, '--');

const testRequest = async (method, path, { token, ...options }) => {
  // create an instance of axios with authentication
  const http = axios.create({
    baseURL: `https://private-anon-9b8a148517-autopilot.apiary-mock.com/${VERSION}/`,
    headers: {
      'Content-Type': 'application/json',
      autopilotapikey: token,
    },
  });

  const res = await http[method](path, { data: options });
  return res.data;
};


const request = async (method, path, { token, ...options }) => {
  // create an instance of axios with authentication
  const http = axios.create({
    baseURL: ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      autopilotapikey: token,
    },
  });

  const res = await http[method](path, options);
  return res.data;
};

export const parse = (obj) => {
  const keys = Object.keys(obj);
  const newObj = {};

  // check that object is deep and throw an error
  keys.forEach((key) => {
    const value = obj[key];
    if (typeof value === 'object') {
      throw new Error(
        'Invalid value type: expected values are string, integer, date, boolean, float',
      );
    }

    // parse data
    const isDateObject = isDate(value);
    const isString = typeof value === 'string';
    const isInteger = Number.isInteger(value);
    const isFloatPoint = isFloat(value);
    const isBoolean = typeof value === 'boolean';

    const predicate = hyphenate(key);

    // set new key in object
    const setValue = (type) => {
      newObj[`${type}--${predicate}`] = value;
    };

    /**
     * alter object key based on value
     */
    if (isString) setValue('string');
    else if (isBoolean) setValue('boolean');
    else if (isFloatPoint) setValue('float');
    else if (isInteger) setValue('integer');
    else if (isDateObject) setValue('date');
  });

  return newObj;
};


export default {
  request,
  testRequest,
};
