import React, { useState, useEffect, useRef } from 'react';
import PrecedingPage from './Survey';
import Component2 from './News';

function App() {
  const [showPrecedingPage, setShowPrecedingPage] = useState(true);
  const component2Ref = useRef(null);

  function handlePrecedingPageSubmit() {
    setShowPrecedingPage(false);
    console.log(component2Ref.current.offsetTop);
  }

  return (
    <div>
      {showPrecedingPage && <PrecedingPage onSubmit={handlePrecedingPageSubmit} />}
      {!showPrecedingPage && (
        <div ref={component2Ref}>
          <Component2 />
        </div>
      )}
    </div>
  );
}

export default App;
