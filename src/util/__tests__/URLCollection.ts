import URLCollection from "../URLCollection";

const hrefs = [
  "https://www.google.com",
  "https://www.wikipedia.org",
  "https://github.com/a",
  "https://github.com/b"
];

const presentURL = new URL(hrefs[0]);

const extraURL = new URL("https://test.com");

it("Initializes from a list of hrefs and contains the right number of URLs", () => {
  const coll = new URLCollection(hrefs);
  expect(coll.urls).toHaveLength(3);
});

it("contains works", () => {
  const coll = new URLCollection(hrefs);

  expect(coll.contains(presentURL)).toBe(true);
});

it("add works", () => {
  const coll = new URLCollection(hrefs);

  const updatedColl = coll.add(extraURL);

  expect(updatedColl.urls).toHaveLength(4);
  expect(updatedColl.contains(extraURL)).toBe(true);
});

it("add is idempotent", () => {
  const coll = new URLCollection(hrefs);

  const updatedColl = coll.add(extraURL).add(extraURL);

  expect(updatedColl.urls).toHaveLength(4);
});

it("remove works", () => {
  const coll = new URLCollection(hrefs);

  const updatedColl = coll.remove(presentURL);

  expect(updatedColl.urls).toHaveLength(2);
  expect(updatedColl.contains(presentURL)).toBe(false);
});
