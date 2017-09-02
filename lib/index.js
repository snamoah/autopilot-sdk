import { methods } from './methods';

export default function Autopilot(apiKey) {
  if (typeof apiKey !== 'string') {
    throw new Error('Invalid API key. Please pass a valid apiKey to constructor');
  }

  this.contacts = methods({ apiKey, method: 'contacts', single: 'contact' });
}

