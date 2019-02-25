# Nudge

A browser extension that redirects distracting webpages to the one you want to focus on.

[Add to Firefox](https://addons.mozilla.org/en-US/firefox/addon/nudge-me/)

## Local Development

Install dependencies and start the hot-reloading server:

```{bash}
$ yarn install
$ yarn watch
```

If developing with Firefox, in a new terminal window:

```{bash}
$ cd build
$ web-ext run
```

If developing with Chrome, navigate to <chrome://extensions/> and load the `build/` directory as an unpacked extension.

Changes made in the source code should now be automatically reflected in the extension (after opening and closing the popup).
