const urlParser = require('../src/utils/url-parser');

describe('url-parser tests', () => {
  const testUrlWithPort = 'http://127.0.0.1:9200';
  const testUrlWithoutPort = 'http://127.0.0.1';
  const testport = '9200';
  const expectedReturn1 = 'http://127.0.0.1:9200/';
  const expectedReturn2 = 'http://127.0.0.1/';

  test.each`
    name                                             | url                   | port                | expected
    ${'urlParser with double ports'}                 | ${testUrlWithPort}    | ${testport}         | ${expectedReturn1}
    ${'urlParser with 1 string port'}                | ${testUrlWithoutPort} | ${testport}         | ${expectedReturn1}
    ${'urlParser with invalid url'}                  | ${''}                 | ${testport}         | ${null}
    ${'urlParser with url with no port and no port'} | ${testUrlWithoutPort} | ${''}               | ${expectedReturn2}
    ${'urlPaser with port being a null value'}       | ${testUrlWithoutPort} | ${null}             | ${expectedReturn2}
    ${'urlPaser with port being an integer'}         | ${testUrlWithoutPort} | ${Number(testport)} | ${expectedReturn1}
    ${'urlPaser with port being an invalid string'}  | ${testUrlWithoutPort} | ${'invalid'}        | ${expectedReturn2}
    ${'urlPaser with an out of range port'}          | ${testUrlWithoutPort} | ${999999}           | ${expectedReturn2}
  `('$name', ({ url, port, expected }) => {
    expect(urlParser(url, port)).toBe(expected);
  });

  // test('urlParser with double ports', () => {
  //   const result = urlParser(testUrlWithPort, testport);
  //   expect(result).toBe(expectedReturn1);
  // });

  // test('urlParser with 1 string port', () => {
  //   const result = urlParser(testUrlWithoutPort, testport);
  //   expect(result).toBe(expectedReturn1);
  // });

  // test('urlParser with invalid url', () => {
  //   const result = urlParser('', testport);
  //   expect(result).toBe(null);
  // });

  // test('urlParser with url with no port and no port', () => {
  //   const result = urlParser(testUrlWithoutPort);
  //   expect(result).toBe(expectedReturn2);
  // });

  // test('urlPaser with port being a null value', () => {
  //   const result = urlParser(testUrlWithoutPort, null);
  //   expect(result).toBe(expectedReturn2);
  // });

  // test('urlPaser with port being an integer', () => {
  //   const result = urlParser(testUrlWithoutPort, Number(testport));
  //   expect(result).toBe(expectedReturn1);
  // });

  // test('urlPaser with port being an invalid string', () => {
  //   const result = urlParser(testUrlWithoutPort, 'invalid');
  //   expect(result).toBe(expectedReturn2);
  // });
  // test('urlPaser with an out of range port', () => {
  //   const result = urlParser(testUrlWithoutPort, 999999);
  //   expect(result).toBe(expectedReturn2);
  // });
});
