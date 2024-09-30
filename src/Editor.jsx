import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import WordCount from './WordCountExtension'; // Ensure this file is correctly set up

const Editor = () => {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    
    
    extensions: [StarterKit, WordCount],
    content: 'Start here...',
    onUpdate({ editor }) {
      const count = editor.storage.wordCount.wordCount; // Access the word count from storage
      setWordCount(count);
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div>
      <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }} >
        <EditorContent editor={editor}  />
      </div>
      <p style={{ marginTop: '10px' }}>Word count: {wordCount}</p>
    </div>
  );
};

export default Editor;
