# set-once

`set-once` allows you to define an object with certain properties that can be set once and only once. Once a property specified as set-once is set, subsequent attempts to set it will fail, either silently or with an exception (if the `throwException` option is specified).

## Basic usage

An object is created by calling `setOnce`, passing an array of the names of properties to be treated as set-once. Other properties can be set more than once.

```javascript
const setOnce = require('set-once');

const obj = setOnce(['name', 'email']);
obj.name = 'Joe'; 
obj.email = 'joe@foo.com';
obj.age = 38;

obj.name = 'Bob';
obj.email = 'bob@foo.com';
obj.age = 40;

console.log(obj.name);  // 'Joe' - second set has no effect
console.log(obj.email); // 'joe@foo.com' - second set has no effect
console.log(obj.age);   // 40 - non-set-once property can be updated
```

## Sealing the object

To seal the returned object, pass the `seal` option. This will allow only the properties specified to be set. Attempts to add other properties will fail, either silently or with an exception (if in strict mode).

```javascript
const setOnce = require('set-once');

const obj = setOnce(['name', 'email'], { seal: true });
obj.name = 'Joe';
obj.email = 'joe@foo.com';
obj.age = 38;

obj.name = 'Bob';
obj.email = 'bob@foo.com';
obj.age = 40;

console.log(obj.name);  // 'Joe'
console.log(obj.email); // 'joe@foo.com'
console.log(obj.age);   // undefined - object was sealed, only 'name' and 'email' properties are allowed
```

## Throwing an exception

By default, attempting to set a set-once property a second time will fail silently. If you want an exception to be thrown in this case, pass the `throwException` option.

```javascript
const setOnce = require('set-once');

const obj = setOnce(['name', 'email'], { throwException: true });
obj.name = 'Joe';
obj.email = 'joe@foo.com';

obj.name = 'Bob'; // exception is thrown here
```
