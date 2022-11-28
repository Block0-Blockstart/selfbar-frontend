import { bnToFloatString, reduceString } from './strings';

describe('reduceString', () => {
  it('crops from left only', () => {
    const res = reduceString({ value: 'abcdefgh', left: 4, right: 0 });
    expect(res).toBe('abcd...');
  });

  it('crops from right only', () => {
    const res = reduceString({ value: 'abcdefgh', left: 0, right: 4 });
    expect(res).toBe('...efgh');
  });

  it('does not crop if left includes the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 8, right: 0 });
    expect(res).toBe('abcdefgh');
  });

  it('does not crop if right includes the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 0, right: 8 });
    expect(res).toBe('abcdefgh');
  });

  it('does not crop if left includes more than the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 20, right: 0 });
    expect(res).toBe('abcdefgh');
  });

  it('does not crop if right includes more than the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 0, right: 20 });
    expect(res).toBe('abcdefgh');
  });

  it('does not crop if left + right include the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 4, right: 4 });
    expect(res).toBe('abcdefgh');
  });

  it('does not crop if left + right include more than the whole string', () => {
    const res = reduceString({ value: 'abcdefgh', left: 10, right: 10 });
    expect(res).toBe('abcdefgh');
  });

  it('returns ... if left and right are 0', () => {
    const res = reduceString({ value: 'abcdefgh', left: 0, right: 0 });
    expect(res).toBe('...');
  });

  it('throws if left is negative', () => {
    expect(() => reduceString({ value: 'abcdefgh', left: -1, right: 0 })).toThrow();
  });

  it('throws if right is negative', () => {
    expect(() => reduceString({ value: 'abcdefgh', left: 0, right: -1 })).toThrow();
  });

  it('throws if value is an array of strings', () => {
    expect(() => reduceString({ value: ['a', 'b'], left: 1, right: 1 })).toThrow();
  });

  it('throws if value is an array of numbers', () => {
    expect(() => reduceString({ value: [1, 2], left: 1, right: 1 })).toThrow();
  });

  it('throws if value is a function', () => {
    expect(() => reduceString({ value: () => console.log('boom'), left: 1, right: 1 })).toThrow();
  });

  it('throws if value is a number', () => {
    expect(() => reduceString({ value: 1234, left: 1, right: 1 })).toThrow();
  });
});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

describe('bnToFloatString', () => {
  it('throws if value = null', () => {
    expect(() => bnToFloatString({ value: '' })).toThrow();
  });

  it('throws if value is an empty string', () => {
    expect(() => bnToFloatString({ value: '' })).toThrow();
  });

  it('throws if value is a string not parseable to integer (I)', () => {
    expect(() => bnToFloatString({ value: 'abcdefgh' })).toThrow();
  });

  it('throws if value is a string not parseable to integer (II)', () => {
    expect(() => bnToFloatString({ value: '0.2' })).toThrow();
  });

  it('does not throw if value is a string parseable to integer', () => {
    expect(() => bnToFloatString({ value: '123456' })).not.toThrow();
  });

  it('does not throw if value is a string parseable to an integer bigger than max safe integer', () => {
    expect(() => bnToFloatString({ value: Number.MAX_SAFE_INTEGER + '1234565611156565' })).not.toThrow();
  });

  it('throws if value is a number exceeding max integer', () => {
    expect(() => bnToFloatString({ value: Number.MAX_SAFE_INTEGER + 1 })).toThrow();
  });

  it('throws if value is a number equals to max integer', () => {
    expect(() => bnToFloatString({ value: Number.MAX_SAFE_INTEGER })).toThrow();
  });

  it('does not throw if value is a number lesser than max integer', () => {
    expect(() => bnToFloatString({ value: Number.MAX_SAFE_INTEGER - 1 })).not.toThrow();
  });

  it('throws if value is a function', () => {
    expect(() => bnToFloatString({ value: () => 'Hello' })).toThrow();
  });

  it('throws if value is an array', () => {
    expect(() => bnToFloatString({ value: ['112', '555'] })).toThrow();
  });

  it('accepts negative values', () => {
    const res = bnToFloatString({ value: '-12345644645564', proportion: 6, precision: 3 });
    expect(res).toBe('-12345644.646');
  });

  it('default to 18 proportion and 5 precision', () => {
    const res = bnToFloatString({ value: '123456789123456789123' });
    expect(res).toBe('123.45679');
  });

  it('supports proportion = 0 and precision = 0', () => {
    const res = bnToFloatString({ value: '123', proportion: 0, precision: 0 });
    expect(res).toBe('123');
  });

  it('works with value = 0', () => {
    const res = bnToFloatString({ value: 0, proportion: 0, precision: 0 });
    expect(res).toBe('0');
  });

  it('supports precision > decimals', () => {
    const res = bnToFloatString({ value: '123', proportion: 1, precision: 3 });
    expect(res).toBe('12.300');
  });

  it('supports precision = decimals', () => {
    const res = bnToFloatString({ value: '123', proportion: 3, precision: 3 });
    expect(res).toBe('0.123');
  });

  it('supports proportion higher than significative numbers', () => {
    const res = bnToFloatString({ value: '123', proportion: 6, precision: 3 });
    expect(res).toBe('0.123');
  });

  it('rounds extreme values', () => {
    const res = bnToFloatString({
      value: Number.MAX_SAFE_INTEGER + '123456789123456789123456789',
      proportion: 27,
      precision: 26,
    });
    expect(res).toBe(Number.MAX_SAFE_INTEGER + '.12345678912345678912345679');
  });
});
