import { isURL } from './functions';

describe('isURL function', () => {
  test('should return true for valid URLs', () => {
    expect(isURL('https://www.example.com')).toBe(true);
    expect(isURL('http://example.com')).toBe(true);
    expect(isURL('http://123.45.67.8')).toBe(true);
    expect(isURL('http://example.com/path/to/resource')).toBe(true);
    expect(isURL('http://example.com/?query=string')).toBe(true);
    expect(isURL('http://example.com/#fragment')).toBe(true);
  });

  test('should return false for invalid URLs', () => {
    expect(isURL('http://example')).toBe(false); // missing TLD
    expect(isURL('http://')).toBe(false); // missing domain
    expect(isURL('http://example..com')).toBe(false); // double dots in domain
    expect(isURL('http://example.com:port')).toBe(false); // missing port
    expect(isURL('')).toBe(false); // empty string
    expect(isURL(null)).toBe(false); // null value
    expect(isURL(undefined)).toBe(false); // undefined value
    expect(isURL(123)).toBe(false); // number
    expect(isURL([])).toBe(false); // array
    expect(isURL({})).toBe(false); // object
    expect(isURL(() => {})).toBe(false); // function
  });
});
