//var omit = require('lodash.omit');
//import omit from 'lodash.omit';
import _ from 'lodash';

const doc2 = {
  text1: {
    slide_number: 0, 
    type:"text", 
    heading: "Introduction", 
    body: "<h2>Hi Rachel, congratulations (...)"
  },
  newSlide: {
    type: "text", 
    heading: "Introduction", 
    body: "<h2>Hi Rachel, congratulations (...)",
    slide_number: 1
  }
}

var doc3 = _.omit(doc2, ['newSlide'])


console.log('doc2')
console.log(doc2)
console.log('doc3')
console.log(doc3)

