import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

const WordCount = Extension.create({
  name: 'wordCount',

  addStorage() {
    return {
      wordCount: 0,
    }
  },

  addProseMirrorPlugins() {
    // Using the arrow function ensures 'this' refers to the current instance of the extension
    const getWordCount = (doc) => {
      const text = doc.textBetween(0, doc.content.size, ' ', ' ');
      if (!text.trim()) {
        return 0;
      }
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      return words.length;
    };

    return [
      new Plugin({
        state: {
          init: (_, { doc }) => {
            return getWordCount(doc); 
          },
          apply: (tr, value, oldState, newState) => {
            if (tr.docChanged) {
              return getWordCount(newState.doc);
            }
            return value;
          },
        },
        view: (view) => {
          this.storage.wordCount = getWordCount(view.state.doc);
          return {
            update: (view, prevState) => {
              if (view.state.doc !== prevState.doc) {
                this.storage.wordCount = getWordCount(view.state.doc);
              }
            },
          };
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
