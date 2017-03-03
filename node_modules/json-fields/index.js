/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

function match_field(field, match){
  if(!match){
    return true;
  }
  var type = typeof(match);

  if(type=='string'){
    if(match.indexOf('/')==0){
      match = new RegExp(match.replace(/^\//, '').replace(/\/$/, ''));
      return match.exec(field);
    }
    else{
      return field.indexOf(match)==0;  
    }
  }
  else{
    return match.exec(field);
  }
}

module.exports = {
  parse:function(obj, match){
    var ret = {};
    Object.keys(obj || {}).forEach(function(key){
      var value = obj[key];
      if(typeof(value)=='string' && match_field(key, match)){
        value = JSON.parse(value);
      }
      ret[key] = value;
    })
    return ret;
  },
  stringify:function(obj, match){
    var ret = {};
    Object.keys(obj || {}).forEach(function(key){
      var value = obj[key];
      if(typeof(value)!='string' && match_field(key, match)){
        value = JSON.stringify(value);
      }
      ret[key] = value;
    })
    return ret;
  }
}