const { expect } = require('chai');

const { <%=safeName%> } = require('../lib/');

describe('<%=safeName%>', () => {
  it('should return 2', done => {
    <%=safeName%>(1)
      .then(result => {
        expect(result).to.equal(2);
        done();
      })
      .catch(err => {});
  });
  it('should catch error', done => {
    <%=safeName%>(100)
      .then(result => {
        done('catch error');
      })
      .catch(err => {
        expect(err.message).to.equal('Out of range');
        done();
      });
  });
});
