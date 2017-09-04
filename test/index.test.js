import Autopilot from '../dist';
import utils from '../dist/utils';
import sinon from 'sinon';
import test from 'tape';

test('Autopilot', async t => {
  t.plan(12);

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
    'Date of Birth': new Date(),
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
  t.ok((typeof res === 'object' && !!res.contact_ids), 'Saves array of contact details on Autopilot');

  const falsyData = {
    banana() {},
    beach: {
      fresh: 1,
    },
  };
  let fn = () => autopilot.contacts.save(falsyData);
  t.throws(fn, 'throws with invalid data');


  // get contact data
  res = await autopilot.contacts.get('chris@autopilothq.com');
  t.ok((typeof res === 'object' && res.hasOwnProperty('contact_id')), 'Get a contact from Autopilot by email');


  // get contact data by id
  res = await autopilot.contacts.get('person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7');
  t.ok((typeof res === 'object' && !!res.contact_id), 'Get a single contact by contact id');

  // get contact data by id
  res = await autopilot.contacts.get(['chris@autopilothq.com', 'person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7']);
  t.ok((res.length === 2 && !!res[0].contact_id && !!res[1].contact_id), 'Get list of contacts by emails and/or contact_ids')



  // delete sample contact data by id
  fn = async () => await autopilot.contacts.delete('person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7');
  t.doesNotThrow(fn, 'Deleted contact by id');

  // delete sample contact by email
  fn = async () => await autopilot.contacts.delete('bonacus@example.com');
  t.doesNotThrow(fn, 'Deleted contact by email');


  // unsbuscribe contact from receiving emails from Autopilot
  fn = () => autopilot.contacts.unsubscribe('test111@example.com');
  t.doesNotThrow(fn, 'Unsubscribes successfully');

  utils.request = realRequest;
});
