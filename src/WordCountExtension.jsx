import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

const WordCount = Extension.create({
  name: 'wordCount',

  addStorage() {
    return {
      wordCount: 0,
    };
  },

  addProseMirrorPlugins() {
    // Using the arrow function ensures 'this' refers to the current instance of the extension
    const getWordCount = (doc) => {
      const text = doc.textBetween(0, doc.content.size, ' ', ' ');
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      return words.length;
    };

    return [
      new Plugin({
        state: {
          init: (_, { doc }) => {
            return getWordCount(doc); // Correctly referencing getWordCount
          },
          apply: (tr, value, oldState, newState) => {
            if (tr.docChanged) {
              return getWordCount(newState.doc); // Correctly referencing getWordCount
            }
            return value;
          },
        },
        props: {
          handleDOMEvents: {
            input: (view) => {
              this.storage.wordCount = getWordCount(view.state.doc); // Accessing storage correctly
              return false;
            },
          },
        },
      }),
    ];
  },

  addCommands() {
    return {
      getWordCount: () => () => {
        return this.storage.wordCount;
      },
    };
  },
});

export default WordCount;
