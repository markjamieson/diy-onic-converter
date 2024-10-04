# diy-onic-converter

A converter function which implements a simplified version of bionic reading on a given CSS selector.

## Usage

1. Copy/paste the full contents of [`public/diy-onic-converter.js`](public/diy-onic-converter.js) into the browser console.
2. Call the function on a CSS selector using `diyOnicConverter(selector, options?)`. e.g.
```JavaScript
// Converts full body with default number of characters bolded
diyOnicConverter('body');

// Converts first instance of article element with class `long-read`, only bolding the first letter of each word
diyOnicConverter('article.long-read', { numChars: 1 });

// Converts full body with first 2 characters extra-bolded and underlined, and remaining characters slightly lighter in color
diyOnicConverter('body', {
  numChars: 2, 
  boldCssRules: ['font-weight: bolder', 'text-decoration: underline'], 
  remainderCssRules: ['color: #0A0A0A'],
});
```

`options` argument accepts the following:

| param | type | description |
|--------|------|-------------|
|`numChars`|number|number of characters at the start of each word to bold|
|`boldCssRules`|string[]|array of CSS rules to apply to the bolded section of each word|
|`remainderCssRules`|string[]|array of CSS rules to apply to the non-bolded section of each word|


This function should work on any webpage which wraps content in `<p>` tags. Tested on Wikipedia and The Guardian and both worked as expected.

## Details

When the function is called, the DOM is modified in place one paragraph at a time. Each paragraph is:
- flattened to just its text content;
- then split into word-like tokens (word-like meaning any string of non-whitespace characters);
- the first _x_ characters of each word is then wrapped in a `<span>` with a namespaced class name;
- the array of tokens is then re-joined by simple space characters; and
- the original content of the paragraph element is replaced with the converted content, while retaining any existing attributes of the original element.

Finally, a stylesheet is appended to the document (if it hasn't already been appended), which controls the styling of the content which is to be bolded.

## Caveats

- All white-space characters in the converted paragraphs will be converted to simple space characters. This means that any non-space whitespace characters will be modified.

## Code notes

- The helper functions are all nested inside the main function to satisfy the requirements of the challenge. Stylistically I would prefer them outside the main function for readability.