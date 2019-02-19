import buildURL from "./buildURL";
import URLCollection from "../../util/URLCollection";

const blockedURL = "https://www.test.com";
const coll = new URLCollection([blockedURL]);

it("builds valid URLs without complaining", () => {
  const url1 = "https://www.google.com";
  const url2 = "http://google.com";

  expect(buildURL(url1, coll)).toEqual(new URL(url1));
  expect(buildURL(url2, coll)).toEqual(new URL(url2));
});

it("build prefix-less URLs without complaining", () => {
  const url = "google.com";

  expect(buildURL(url, coll)).toEqual(new URL("https://google.com"));
});

it("won't build URLs that are already blocked", () => {
  expect(() => buildURL(blockedURL, coll)).toThrow(
    "You can't target a page that you've blocked!"
  );
});

it("won't build URLs that are invalid", () => {
  expect(() => buildURL("%", coll)).toThrow("Please enter a valid URL!");
});
