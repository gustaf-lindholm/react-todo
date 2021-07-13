import React, { useState } from 'react';
import Todos from './Todos';
import TodoForm from './TodoForm';

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
      <div>
        <TodoForm error={error} loading={loading} setError={setError} setLoading={setLoading}/>
      </div>
      <div className="pa4">
        <h2>Tasks</h2>
        <a className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">All</span>
        </a>
        <a className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Active</span>
        </a>
        <a className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Completed</span>
        </a>
      </div>
      <div className="pa4">
        {<Todos error={error} setError={setError} loading={loading} setLoading={setLoading} />}
      </div>
    </div>
  );
}

export default App;
