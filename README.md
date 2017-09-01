<p align="center"><a href="https://autopilothq.com/images/svg/logo-dark.svg" target="_blank"><img src="https://autopilothq.com/images/svg/logo-dark.svg" height="30" /></a></p>

## Intro

This is an un-official Node SDK for interfacing the Autopilot API. You can view the REST api documentation [here](http://docs.autopilot.apiary.io) 
Some cool features include:

- Pass a normal JSON object and it would figure out which ones are custom fields and which ones are not
- Automatically reformat keys to contain Autopilot data types along with all neccessary hyphens. E.g.`{'Foo Bar': true}` will re-format to `{'boolean--Foo--Bar': true}` 
- Add/Update/Delete Contact
- Unsubscribe Contact from a list
- Create lists
- Add Contacts to lists
- Get all Segments
- Register/Unregister hooks etc...


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

All calls on the contact/contacts scope must have a `contact_id` or `email` member parameter. Find more in the Autopilot [documentation]('http://docs.autopilot.apiary.io/#reference/api-methods/addupdate-contact/add-or-update-contact').

### contacts#save()

**Parameters:**
  - _**data**_ - An Object containing new/existing user details

**Return Value:** Returns a promise that resolves to:
```javascript
//=> { contact_id: '<id>' }
```

#### Example
```javascript
import Autopilot from 'autopilot-sdk';

const autopilot = new Autopilot(<EXAMPLE_API_KEY>);
const contactData = {
  'email': 'johndoe@example.com',
  'Full Name': 'John Doe',
  'Gender': 'male',
  'age': 35,
};

await autopilot.contacts.save(contactData);
//=> { contact_id: 'person_32941749279223008202071' }
```

