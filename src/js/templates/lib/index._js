'use strict';

function <%=safeName%>(num) {
  return new Promise((resolve, reject) => {
    if (num < 10) {
      resolve(2);
    } else {
      reject(new Error('Out of range'));
    }
  });
}

module.exports =  { <%=safeName%> };
