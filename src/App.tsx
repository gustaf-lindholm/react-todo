import * as React from 'react';
import Todos from './containers/Todos';
import TodoForm from './containers/TodoForm';
import { TodoInterface } from './utils/Interfaces';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<Array<TodoInterface> | []>([]);
  const [todoStatus, setTodoStatus] = React.useState<React.SetStateAction<string | null>>(null); // value and trigger for sorting by completed, active or all todos
  const [order, setOrder] = React.useState<React.SetStateAction<string>>('desc'); // value and trigger for ordering the todos by time added


  React.useEffect(() => {
    // if todoStatus is set, append to url
    const sortParameter = todoStatus ? `&status=${todoStatus}` : ""
    
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
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
        // setTodoStatus("asc")
      }
    }
    getTodos();
  }, [order, loading, todoStatus]); // anyting listed in the dependency array can trigger a re-run of useEffect
  
  function sortHandler(e : React.PointerEvent<HTMLButtonElement>) {
    setLoading(true);
    
    const target = e.target as Element;
    //ta e.target.id och plockat ut strängen efter status-
    // hämta todos baserat på parametern
    const parameter = target.id.substr(7).toUpperCase() 

    setTodoStatus(parameter);
    setLoading(false)
  }


  return (
    <div className="App fl w-100 pa6-ns tc">
      <header className="App-header">
        <ul>
          <li>Header </li>
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
