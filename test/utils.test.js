import {isDate, isFloat, hyphenate, parse} from '../dist/utils';
import test from 'tape';

test('isDate', t => {
  t.plan(2);
  const date = new Date();

  // should be true if it is a valid date
  t.ok(isDate(date), 'returns true for valid date');
  t.notOk(isDate('foobar'), 'returns false for invalid date');
});

test('isFloat', t => {
  t.plan(3);

  t.ok(isFloat(2.3), 'returns true for valid floating point number');
  t.notOk(isFloat('2.3'), 'returns false for floating point string numbers');
  t.notOk(isFloat(2), 'returns false for integer values');
});

test('hyphenate', t => {
  t.plan(2);

  t.equal(hyphenate('New Store'), 'New--Store', 'returns hyphenated string');
  t.equal(
    hyphenate('   New Store   '),
    'New--Store',
    'trims string and returns hyphenated string',
  );
});

test('parse', t => {
  t.plan(2);

  const obj = {
    'First Name': 'Jon',
    'Last Name': 'Doe',
    age: 34,
    gender: 1,
    married: false,
  };

  t.deepEqual(
    parse(obj),
    {
      'string--First--Name': 'Jon',
      'string--Last--Name': 'Doe',
      'integer--age': 34,
      'integer--gender': 1,
      'boolean--married': false,
    },
    'asserts true for valid object properties',
  );

  const fn = () => parse({foo: {bar: 1}});
  t.throws(fn, 'throws error for nested object');
});
