import React, { useState } from 'react';
import Todos from './Todos';

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="App fl w-100 pa6-ns tc">
      <header className="App-header">
        <ul>
          <li>Header </li>
          <li>
            <button onClick={() => localStorage.clear()}>Clear storage</button>
          </li>
        </ul>
      </header>

      <div className="pa4">
        {<Todos error={error} setError={setError} loading={loading} setLoading={setLoading}/>}
      </div>
    </div>
  );
}

export default App;
