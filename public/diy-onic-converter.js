/**
 * Implement your converter function here.
 */
const diyOnicConverter = (
  textContentContainerSelector,
  opts = { numChars: 3, boldCssRules: undefined, remainderCssRules: undefined }
) => {
  const validateOptions = (opts) => {
    if (typeof opts !== 'object') {
      console.warn('Invalid `opts` argument, reverting to default value');
      opts = {
        numChars: 3,
        boldCssRules: undefined,
        remainderCssRules: undefined,
      };
    }
    const validatedOptions = { ...opts };
    if (typeof opts.numChars !== 'number' || opts.numChars < 1) {
      console.warn(
        'Invalid `charsToBold` argument, reverting to default value'
      );
      validatedOptions.numChars = 3;
    }
    if (opts.boldCssRules && !Array.isArray(opts.boldCssRules)) {
      console.warn('Invalid `boldCssRules` argument, reverting to undefined');
      validatedOptions.boldCssRules = undefined;
    }
    if (opts.remainderCssRules && !Array.isArray(opts.remainderCssRules)) {
      console.warn(
        'Invalid `remainderCssRules` argument, reverting to undefined'
      );
      validatedOptions.remainderCssRules = undefined;
    }
    return validatedOptions;
  };

  const convertWord = (word) => {
    const toBold = word.substr(0, numChars);
    const remainder = word.substr(numChars);

    const boldSpan = document.createElement('span');
    boldSpan.className = 'diy-onic-converter__bold';
    boldSpan.innerText = toBold;

    const remainderSpan = document.createElement('span');
    remainderSpan.className = 'diy-onic-converter__remainder';
    remainderSpan.innerText = remainder;
    return `${boldSpan.outerHTML}${remainderSpan.outerHTML}`;
  };

  const convertParagraph = (paragraph) => {
    const flattenedParagraph = paragraph.innerText;
    const words = flattenedParagraph.split(/\s+/);
    const convertedWords = words.map(convertWord);
    return convertedWords.join(' ');
  };

  const insertStyleRule = (styleSheet, rule, subSelector) => {
    if (typeof rule !== 'string') return;
    if (!rule.endsWith(';')) rule = `${rule};`;
    styleSheet?.insertRule(`
          .diy-onic-converter__${subSelector} {
            ${rule}
          }`);
  };

  const insertStyleSheet = () => {
    const ID = 'diy-onic-converter-stylesheet';
    if (document.getElementById(ID)) {
      document.getElementById(ID)?.remove();
    };
    const styleSheet = document.createElement('style');
    styleSheet.id = ID;
    document.head.append(styleSheet);
    styleSheet.sheet?.insertRule(`
      .diy-onic-converter__bold {
        font-weight: 700;
      }
    `);
    if (boldCssRules) {
      boldCssRules.forEach((rule) =>
        insertStyleRule(styleSheet.sheet, rule, 'bold')
      );
    }
    if (remainderCssRules) {
      remainderCssRules.forEach((rule) =>
        insertStyleRule(styleSheet.sheet, rule, 'remainder')
      );
    }
  };

  const container = document.querySelector(textContentContainerSelector);
  console.log('Performing bionic reading conversion on:', container);

  const { numChars, boldCssRules, remainderCssRules } = validateOptions(opts);

  if (!container) {
    console.error(
      'Failed to find a container with given selector',
      textContentContainerSelector
    );
    return;
  }

  const paragraphs = container.querySelectorAll('p');
  paragraphs.forEach(
    (paragraph) => (paragraph.innerHTML = convertParagraph(paragraph))
  );

  insertStyleSheet();
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
