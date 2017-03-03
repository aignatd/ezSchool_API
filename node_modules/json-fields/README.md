json-fields
===========

![Build status](https://api.travis-ci.org/binocarlos/json-fields.png)

JSON.parse and JSON.stringify for certain properties of an object

# install

```
$ npm install json-fields
```

## example

JSON.parse some fields of an object:

```js
var jsonfields = require('json-fields');

var obj = {
  'x-json-user':'{"name":"bob"}',
  'x-json-thing':'{"apple":"green"}',
  'normalfield':'{"a":10}'
}

var parsedobj = jsonfields.parse(obj, 'x-json');
```

JSON.stringify some fields of an object:

```js
var jsonfields = require('json-fields');

var obj = {
  'x-json-user':{
    name:'bob'
  },
  'x-json-thing':{
    apple:'green'
  },
  'normalfield':'{"a":10}'
}

var stringobj = jsonfields.stringify(obj, 'x-json');
```

## licence
MIT