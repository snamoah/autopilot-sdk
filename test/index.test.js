import Autopilot from '../dist';
import utils from '../dist/utils';
import sinon from 'sinon';
import test from 'tape';

test('Autopilot', t => {
  t.plan(5);

  const autopilot = new Autopilot('sample api key');
  t.ok(autopilot instanceof Autopilot, 'creates Autopilot instance');
  t.ok(autopilot.apiKey === undefined, 'apiKey is not publicly accessible');

  t.comment('Contacts');
  t.ok(autopilot.contacts instanceof Object, 'contacts instance method exists');
  const requestStub = sinon.stub(utils, 'request');
  requestStub.returns(Promise.resolve());

  const contactData = {
    email: 'test@test.com',
    'Full Name': 'John Doe',
    bar: false,
    age: 34,
  };

  let res = autopilot.contacts.save(contactData);
  t.ok(res instanceof Promise, 'Saves contact data on Autopilot');

  const falsyData = {
    banana() {},
    beach: {
      fresh: 1,
    },
  };
  const fn = () => autopilot.contacts.save(falsyData);
  t.throws(fn, 'throws with invalid data');

  requestStub.restore();
});
