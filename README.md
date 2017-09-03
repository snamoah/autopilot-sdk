<p align="center"><a href="https://autopilothq.com/images/svg/logo-dark.svg" target="_blank"><img src="https://autopilothq.com/images/svg/logo-dark.svg" height="60" /></a></p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" />
  <a href="https://www.npmjs.com/package/autopilot-sdk"><img src="https://img.shields.io/npm/v/autopilot-sdk.svg" /></a>
</p>

## Intro

This is an un-official Node SDK for interfacing the Autopilot API. You can view the REST api documentation [here](http://docs.autopilot.apiary.io). Some cool features include:

- Pass a normal JSON object and it would figure out which ones are custom fields and which ones are not
- Automatically reformat keys to contain Autopilot data types along with all neccessary hyphens. E.g.`{'Foo Bar': true}` will re-format to `{'boolean--Foo--Bar': true}` 
- Add/Update/Delete Contact
- Unsubscribe Contact from a list
- Create lists
- Add Contacts to lists
- Get all Segments
- Register/Unregister hooks etc...

**NB:** _Still under development so some APIs may not be available yet._


## Installation
```
> npm i -S autopilot-sdk
```

## Usage

```javascript
import Autopilot from 'autopilot-sdk';

const autopilot = new Autopilot('<API_KEY>');
//=> autopilot instance
```

## API

The Autopilot instance has instance members that access the scopes of the API. Namely: `contacts`, `lists`, `journeys`, `segments`, etc... Below is the list of the methods for all the scopes.

**NB:** All calls on the contact/contacts scope must have a `contact_id` or `email` member parameter. Find more in the Autopilot [documentation]('http://docs.autopilot.apiary.io/#reference/api-methods/addupdate-contact/add-or-update-contact').

### contacts#save()

**Parameters:**
  - _**data**_ - An Object containing new/existing user details
 
**Example:**
```javascript
const contactData = {
  'email': 'johndoe@example.com',
  'Full Name': 'John Doe',
  'Gender': 'male',
  'age': 35,
};

await autopilot.contacts.save(contactData);
//=> { contact_id: 'person_32941749279223008202071' }

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
await autopilot.contacts.save(multipleContactsData);
```

### contacts#get()

**Parameters:**
  - _**args**_ - This must be a _email/contact_id_ string or an array of _email/contact_ids_ to retrieve

**Example:**
```javascript
// get contact data by email
const contactByEmail = await autopilot.contacts.get('chris@autopilothq.com');

// get contact data by id
const contactById = await autopilot.contacts.get('person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7');

// get list of contact data by either email or id
const contacts = await autopilot.contacts.get(['chris@autopilothq.com', 'person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7']);
```

### contacts#delete()

**Parameters:**
  - _**emailOrId**_ - As the name suggest, it must be an `email` or `contact_id`
  
**Example:**
```javascript
// NB: the delete API doesn't return any object. You'll know it failed when the promise fails.
await autopilot.contacts.delete('person_9EAF39E4-9AEC-4134-964A-D9D8D54162E7');
//=> undefined

await autopilot.contacts.delete('test@example.com');
//=> undefined
```

### contacts#unsubscribe()

**Parameters:**
  - _**emailOrId**_ - As the name suggest, it must be an `email` or `contact_id` to unsubscribe
  
**Example:**
```javascript
await autopilot.contacts.unsubscribe('test@example.com');
//=> undefined
```

