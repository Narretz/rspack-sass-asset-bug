# rspack sass bug repro

run `npm run build:rspack`.

Go to `localhost:8085`

You can see that in the scss div, there are not background images, because
the url is still `url(../assets/leading.svg)` (the asset was not processed).

In the css div, it works.

If you run `npm run build:webpack`, it works in both.

the problem is this css:

```
body {
  content: var(--some-var, "\f101");
}
```

The private use area unicode breaks the asset processing.

- if you set the unicode as value of content, it works (bug is in variabel parsing somewhere?)
- If you move the block after the asset, it works
- if you use other unicode values, like emojis, it also works
- if the rspack mode is "development" it also works

These private unicode areas are widely used in ag-grid:

https://github.com/ag-grid/ag-grid/blob/3930d31b4e0f7db83a9a427b151ecb0a52da210d/packages/ag-grid-community/styles/_icon-font-codes.scss#L5
