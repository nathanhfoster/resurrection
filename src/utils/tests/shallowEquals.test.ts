import shallowEquals from '../shallowEquals';

describe('shallowEquals', () => {
  it('should return false when two objects have different key lengths', () => {
    const a = { key1: false };
    const b = { ...a, key2: true };
    const result = shallowEquals(a, b);
    expect(result).toBe(false);
  });

  it('should return false when two objects have nested objects of different key lengths', () => {
    const a = { key1: { key2: false, key3: false } };
    const b = { ...a };
    // @ts-ignore
    b.key1 = { ...a.key1, key4: true };
    const result = shallowEquals(a, b);
    expect(result).toBe(false);
  });

  it('should return true when two objects have nested objects keys that share the same reference', () => {
    const a = { key1: { key2: false, key3: false } };
    const b = { ...a };
    b.key1.key3 = true;
    const result = shallowEquals(a, b);
    expect(result).toBe(true);
  });


  it('should return false when an object is not comparable', () => {
    const a = { key1: false };
    const b = null;
    const result = shallowEquals(a, b);
    expect(result).toBe(false);
  });

  it('should return true when the compared objects key are NaN', () => {
    const a = { key1: NaN };
    const b = { key1: NaN };
    const result = shallowEquals(a, b);
    expect(result).toBe(true);
  });

  it('should return true when the compared objects are a shallow copy of each other', () => {
    const a = { key1: 'key1', key2: 2, key3: { key3: 'key3' }, key4: false, key5: [5] };
    const b = { ...a };
    const result = shallowEquals(a, b);
    expect(result).toBe(true);
  });

  it('should return false when the compared objects are a deep copy of each other', () => {
    const a = { key1: 'key1', key2: 2, key3: { key3: 'key3' }, key4: false, key5: [5] };
    const b = { ...a, key3: { ...a.key3 } };
    const result = shallowEquals(a, b);
    expect(result).toBe(false);
  });
});

