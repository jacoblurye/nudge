import SimpleClient from "../SimpleClient";
import testClient from "../__testutils__/testClient";

describe("SimpleClient", () => {
  testClient(new SimpleClient());
});
