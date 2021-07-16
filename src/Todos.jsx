import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Spinner from './Spinner';
import TodoForm from './TodoForm';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
//state enums 
const TODOSTATUS = {
  ACTIVE: "ACTIVE",
  DONE: "DONE",
  TRASHED: "TRASHED"
}

export default function Todos({ error, loading, setLoading, setError }) {
  const [status, setStatus] = useState(false);
  // const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState([]);
  const [currId, setCurrId] = useState(null); // Used to show loading spinner in specific todo on delete
  const [sortOrder, setSortOrder] = useState('desc'); // value and trigger for sorting the todos

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(`${baseUrl}/todos?_sort=added&_order=${sortOrder}`);
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
      }
    }
    getTodos();
  }, [loading, sortOrder]); // anyting listed in the dependency array can trigger a re-run of useEffetct

  async function doneHandler(e) {
    setCurrId(e.target.id);
    const isChecked = e.target.checked

    const status = isChecked ? TODOSTATUS.DONE : TODOSTATUS.ACTIVE

    console.log(e.target)
    const body = JSON.stringify({
      done: e.target.checked,
      status
    });

    try {
      setLoading(true);
      const response = await fetch(baseUrl + `/todos/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
    } catch (error) {
      setError(error);
      alert(error);
    } finally {
      setLoading(false);
      setCurrId(null);
    }
  }

  async function deleteHandler(e, id) {
    try {
      setLoading(true);
      setCurrId(id);
      const response = await fetch(baseUrl + `/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setCurrId(null);
    }
  }

  function sortHandler(e) {
    setLoading(true);

    setSortOrder(e.target.id);
  }

  if (todos.length === 0) return <h1>You don't have any todos</h1>;
  if (loading && !currId) return <Spinner />;
  return (
    <>
      <div>
        <TodoForm TODOSTATUS={TODOSTATUS} setLoading={setLoading}/>
      </div>
      <div className="pa4">
        <h2>Tasks</h2>
        <a id="status-all" className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">All</span>
        </a>
        <a id="status-active" className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Active</span>
        </a>
        <a id="status-completed" className="w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Completed</span>
        </a>
      </div>
      <div>
        <a
          id="desc"
          className="pointer w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
          onClick={sortHandler}
        >
          &uarr;
        </a>
        <a
          id="asc"
          className="pointe w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4r"
          onClick={sortHandler}
        >
          &darr;
        </a>

        {todos.map((todo, i) => (
          <Todo
            currId={currId}
            key={todo.id}
            todo={todo}
            doneHandler={doneHandler}
            deleteHandler={deleteHandler}
            loading={loading}
          />
        ))}
      </div>
    </>
  );
}
