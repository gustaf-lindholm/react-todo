import React, { useState, useEffect } from 'react';
import Todos from './Todos';
import TodoForm from './TodoForm';

//state enums
const TODOSTATUS = {
  ACTIVE: 'ACTIVE',
  DONE: 'DONE',
  TRASHED: 'TRASHED',
};
const baseUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState();
  const [order, setOrder] = useState('desc'); // value and trigger for sorting the todos


  useEffect(() => {
    // if sort is set, append to url
    const sortParameter = sort ? `&status=${sort}` : ""
    
    async function getTodos() {
      try {
        const response = await fetch(`${baseUrl}/todos?_sort=added&_order=${order}${sortParameter}`);
        if (response.ok) {
          const json = await response.json();
          setTodos(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setSort()
      }
    }
    getTodos();
  }, [loading, order]); // anyting listed in the dependency array can trigger a re-run of useEffetctisted in the dependency array can trigger a re-run of useEffetct
  
  function sortHandler(e) {
    
    //ta e.target.id och plockat ut strängen efter status-
    // hämta todos baserat på parametern
    const parameter = e.target.id.substr(7).toUpperCase() 

    setSort(parameter);
    setLoading(true);

  }


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
        <TodoForm
          error={error}
          loading={loading}
          setError={setError}
          setLoading={setLoading}
          TODOSTATUS={TODOSTATUS}
          todos={todos}
        />
      </div>
      <div className="pa4">
        <h2>Tasks</h2>
        <button id="status-all" onClick={sortHandler} className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          All
        </button>
        <button id="status-active" onClick={sortHandler} className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          Active
        </button>
        <button id="status-done" onClick={sortHandler} className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          Completed
        </button>
      </div>
      <div className="pa4">
        {
          <Todos
            todos={todos}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            sortHandler={sortHandler}
            TODOSTATUS={TODOSTATUS}
            setSort={setSort}
            setOrder={setOrder}
            todos={todos}
          />
        }
      </div>
    </div>
  );
}

export default App;
