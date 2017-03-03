/*

	(The MIT License)

	Copyright (C) 2005-2013 Kai Davenport

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*
  Module dependencies.
*/
var jsonfields = require('../');

describe('json fields', function(){
	
  it('should match a RegExp object', function () {
    var obj = {
      apple:'{"b":10}',
      pear:'{"b":10}'
    }

    var testobj = jsonfields.parse(obj, /a..le/);

    testobj.apple.b.should.equal(10);
    testobj.pear.should.equal('{"b":10}');
  })

  it('should match a RegExp string', function () {
    var obj = {
      apple:'{"b":10}',
      pear:'{"b":10}'
    }

    var testobj = jsonfields.parse(obj, '/a..le/');

    testobj.apple.b.should.equal(10);
    testobj.pear.should.equal('{"b":10}');
  })

  it('should match a string', function () {
    var obj = {
      apple:'{"b":10}'
    }

    var testobj = jsonfields.parse(obj, 'app');

    testobj.apple.b.should.equal(10);
  })

  it('should parse JSON fields', function () {
    var obj = {
      'x-json-user':'{"name":"bob"}',
      'x-json-thing':'{"apple":"green"}',
      'normalfield':'{"a":10}'
    }

    var testobj = jsonfields.parse(obj, 'x-json');

    testobj['x-json-user'].name.should.equal('bob');
    testobj['x-json-thing'].apple.should.equal('green');
    testobj['normalfield'].should.equal('{"a":10}');
  });

  it('should stringify JSON fields', function () {
    var obj = {
      'x-json-user':{
        name:'bob'
      },
      'x-json-thing':{
        apple:'green'
      },
      'normalfield':'{"a":10}'
    }

    var testobj = jsonfields.stringify(obj, 'x-json');

    testobj['x-json-user'].should.equal('{"name":"bob"}')
    testobj['x-json-thing'].should.equal('{"apple":"green"}')

  });

})


