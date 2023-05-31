/**
* This function will take defaults and returns a function to create story variants
* @param {function} defaultTemplate template function that takes args and returns a string
* @param {object} defaultArgs default argument object
* @param {string} defaultDescription default story description
* @returns {object} {defaultStory, createStoryVariant(arg, description)}
*/
export const storiesConstuctor = (defaultTemplate, defaultArgs, defaultDescription) => {
  const defaultStory = defaultTemplate.bind({});
  defaultStory.args = defaultArgs;
  defaultStory.parameters = {
    docs: {
      description: {
        story: defaultDescription,
      },
    },
  };
  return {
    defaultStory,
    createStoryVariant: (args, description) => {
      const newStory = defaultTemplate.bind({});
      newStory.args = {
        ...defaultArgs,
        ...args,
      };
      newStory.parameters = {
        docs: {
          description: {
            story: description ?? defaultDescription,
          },
        },
      };
      return newStory;
    },
  };
};

/**
 * This function will remove empty lines from the template string
 * @param {string} text
 * @returns {string} text without empty lines
 */
export const removeEmptyLines = (text = '') => text
  .split('\n')
  .filter((textPart) => Boolean(textPart.trim()))
  .join('\n');

/**
 * This function creates a Storybook ArgsTable settings object.
 * The goal is to organize the Storybook only controls under
 * the same category in the ArgsTable
 * @param {string} slotName
 */
export const getStoryControlSettings = (slotName, description = `**NOT PART OF COMPONENT API**. Modifies the \`${slotName}\` slot content in this storybook story`) => ({
  description,
  table: {
    category: 'Story Controls. Not component API',
  },
});

const additionalKebabCount = 5;

const baseTag = `([a-z]+)-([a-z]+)${new Array(additionalKebabCount).fill('(-[a-z]+)?').join('')}`;
const initialTag = new RegExp(`<${baseTag}`, 'g');
const endTag = new RegExp(`</${baseTag}`, 'g');

export const transformHTMLTagsToReact = (htmlString) => htmlString
  .replace(
    initialTag,
    (_match, p1, p2, ...other) => {
      let string = '';
      if (p1) string += `<${p1.charAt(0).toUpperCase() + p1.slice(1)}`;
      if (p2) string += `${p2.charAt(0).toUpperCase() + p2.slice(1)}`;
      for (let index = 0; index < additionalKebabCount; index += 1) {
        if (typeof other[index] === 'string') {
          string += `${other[index].charAt(1).toUpperCase() + other[index].slice(2)}`;
        }
      }
      return string;
    },
  )
  .replace(
    endTag,
    (_match, p1, p2, ...other) => {
      let string = '';
      if (p1) string += `</${p1.charAt(0).toUpperCase() + p1.slice(1)}`;
      if (p2) string += `${p2.charAt(0).toUpperCase() + p2.slice(1)}`;
      for (let index = 0; index < additionalKebabCount; index += 1) {
        if (typeof other[index] === 'string') {
          string += `${other[index].charAt(1).toUpperCase() + other[index].slice(2)}`;
        }
      }
      return string;
    },
  );

export const removeScriptTags = (htmlString) => (
  htmlString
    .replaceAll('<script>', '\n<!--\n<script>')
    .replaceAll('</script>', '</script>\n-->')
);
