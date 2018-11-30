const { expect } = require('chai');

const setOnce = require('./set-once');

describe('set-once', () => {
  it('should make all specified properties set-once and allow other properties', () => {
    const foo = setOnce(['name', 'age']);

    foo.name = 'Joe';
    foo.age = 38;
    foo.email = 'joe@foo.com';
    expect(foo.name).to.equal('Joe');
    expect(foo.age).to.equal(38);
    expect(foo.email).to.equal('joe@foo.com');

    foo.name = 'Bob';
    foo.age = 40;
    foo.email = 'bob@foo.com';
    expect(foo.name).to.equal('Joe');
    expect(foo.age).to.equal(38);
    expect(foo.email).to.equal('bob@foo.com');
  });

  it('should seal the object if the `seal` option is given', () => {
    const foo = setOnce(['name', 'age'], { seal: true });

    foo.name = 'Joe';
    foo.age = 38;
    foo.email = 'joe@foo.com';
    expect(foo.name).to.equal('Joe');
    expect(foo.age).to.equal(38);
    expect(foo.email).to.be.undefined;
  });

  it('should throe an exception if the `throwException` option is given', () => {
    const foo = setOnce(['name'], { throwException: true });

    foo.name = 'Joe';
    expect(foo.name).to.equal('Joe');

    expect(() => foo.name = 'Bob').to.throw();
  });
});
