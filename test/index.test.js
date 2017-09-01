import Autopilot from '../dist';
import utils from '../dist/utils';
import sinon from 'sinon';
import test from 'tape';

test('Autopilot', async t => {
  t.plan(6);

  const autopilot = new Autopilot('65263027fab7d440ba4c5f3b834fb800');
  t.ok(autopilot instanceof Autopilot, 'creates Autopilot instance');
  t.ok(autopilot.apiKey === undefined, 'apiKey is not publicly accessible');

  t.comment('Contacts');
  t.ok(autopilot.contacts instanceof Object, 'contacts instance method exists');

  // sav single contact data
  const realRequest = utils.request;
  utils.request = utils.testRequest;
  const contactData = {
    email: 'test@test.com',
    FirstName: 'John',
    LastName: 'Doe',
    'Full Name': 'John Doe',
    bar: false,
    age: 34,
  };

  let res = await autopilot.contacts.save(contactData);
  t.ok((typeof res === 'object' && res.hasOwnProperty('contact_id')), 'Saves contact data on Autopilot');

  // saving multiple contacts at once
  const multipleContactsData = [
    {
      email: 'test@example.com',
      FirstName: 'Seeker',
      LastName: 'Drew',
      'Full Name': 'Seeker Drew',
      foo: true,
      age: 21,
    },
    {
      email: 'test1@example.com',
      FirstName: 'Bill',
      LastName: 'Gates',
      'Full Name': 'Bill Gates',
      foo: false,
      age: 25,
    },
  ];
  res = await autopilot.contacts.save(multipleContactsData);
  t.ok((typeof res === 'object'), 'Saves array of contact details on Autopilot');

  const falsyData = {
    banana() {},
    beach: {
      fresh: 1,
    },
  };
  const fn = () => autopilot.contacts.save(falsyData);
  t.throws(fn, 'throws with invalid data');

  utils.request = realRequest;
});
