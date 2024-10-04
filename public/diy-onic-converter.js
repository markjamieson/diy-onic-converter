/**
 * Implement your converter function here.
 */
const diyOnicConverter = (textContentContainerSelector, charsToBold = 3) => {
  const convertWord = (word) => {
    const toBold = word.substr(0, charsToBold);
    const remainder = word.substr(charsToBold);
    const span = document.createElement('span');
    span.className = 'diy-onic-converter__bold';
    span.innerText = toBold;
    return `${span.outerHTML}${remainder}`;
  };

  const convertParagraph = (paragraph) => {
    const flattenedParagraph = paragraph.innerText;
    const words = flattenedParagraph.split(/\s+/);
    const convertedWords = words.map(convertWord);
    return convertedWords.join(' ');
  };

  const insertStyleSheet = () => {
    const ID = 'diy-onic-converter-stylesheet';
    if (document.getElementById(ID)) return;
    const styleSheet = document.createElement('style');
    styleSheet.id = ID;
    document.head.append(styleSheet);
    styleSheet.sheet?.insertRule(`
      .diy-onic-converter__bold {
        font-weight: 700;
      }
    `);
  };

  const container = document.querySelector(textContentContainerSelector);
  console.log('Performing bionic reading conversion on:', container);

  if (!container) {
    console.error('Failed to find a container with given selector', textContentContainerSelector);
    return;
  }

  if (typeof charsToBold !== 'number' || charsToBold <= 0) {
    console.warn('Invalid `charsToBold` argument, reverting to default value')
    charsToBold = 3;
  }

  const paragraphs = container.querySelectorAll('p');
  paragraphs.forEach(
    (paragraph) => (paragraph.innerHTML = convertParagraph(paragraph))
  );

  insertStyleSheet();
};

// Allow global access so that this can be executed from the console.
window.diyOnicConverter = diyOnicConverter;
