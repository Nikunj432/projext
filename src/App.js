import React from 'react';
import Editor from './Editor';
import ErrorBoundary from './ErrorBoundary'; // Import the error boundary

const App = () => {
  return (
    <ErrorBoundary>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 >Rich Text Editor with Word Count</h1>
        <Editor  />
      </div>
    </ErrorBoundary>
  );
};

export default App;
