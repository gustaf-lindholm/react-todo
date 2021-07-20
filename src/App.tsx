import * as React from 'react';
import Todos from './Todos';
import TodoForm from './TodoForm';
import { TODOSTATUS } from './enums';
import { TodoInterface } from './Interfaces';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<Array<TodoInterface> | []>([]);
  const [sort, setSort] = React.useState<React.SetStateAction<string>>("asc");
  const [order, setOrder] = React.useState<React.SetStateAction<string>>('desc'); // value and trigger for sorting the todos


  React.useEffect(() => {
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
        setSort("asc")
      }
    }
    getTodos();
  }, [loading, order]); // anyting listed in the dependency array can trigger a re-run of useEffetctisted in the dependency array can trigger a re-run of useEffetct
  
  function sortHandler(e : React.PointerEvent<HTMLButtonElement>) {
    
    const target = e.target as Element;
    //ta e.target.id och plockat ut strängen efter status-
    // hämta todos baserat på parametern
    const parameter = target.id.substr(7).toUpperCase() 

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
          setLoading={setLoading}
          setError={setError}
          todos={todos}
        />
      </div>
      <div className="pa4">
        <h2>Tasks</h2>
        <button id="status-" onClick={sortHandler} className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
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
            setOrder={setOrder}
          />
        }
      </div>
    </div>
  );
}

export default App;
