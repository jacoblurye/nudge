import URLCollection from "../../../util/URLCollection";

const buildURL = (href: string, blockedURLs: URLCollection) => {
  let url;
  try {
    url = href.startsWith("http") ? new URL(href) : new URL(`http://${href}`);
  } catch {
    throw "Please enter a valid URL!";
  }

  if (blockedURLs.contains(url))
    throw "You can't target a page that you've blocked!";

  return url;
};

export default buildURL;
