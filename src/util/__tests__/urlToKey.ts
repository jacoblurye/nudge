import urlToKey from "../urlToKey";

it("produces the expected key given a URL", () => {
  const url = new URL("https://www.google.com");

  expect(urlToKey(url)).toBe("www.google.com");
});

it("produces the same key for two URLs on the same domain", () => {
  const url1 = new URL("https://www.google.com/a");
  const url2 = new URL("https://www.google.com/b");

  expect(urlToKey(url1)).toBe(urlToKey(url2));
});
