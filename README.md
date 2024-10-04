# diy-onic-converter

A converter function which implements a simplified version of bionic reading on a given CSS selector.

## Usage

1. Copy/paste the full contents of [`public/diy-onic-converter.js`](public/diy-onic-converter.js) into the browser console.
2. Call the function on a CSS selector using `diyOnicConverter(selector, charsToBold?)`. e.g.
```JavaScript
// Converts full body with default number of characters bolded
diyOnicConverter('body');

// Converts first instance of article element with class `long-read`, only bolding the first letter of each word
diyOnicConverted('article.long-read', 1);
```

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