import React, { useState, useEffect, useRef } from 'react';
import Todo from './Todo';
import Spinner from './Spinner';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Todos({ error, loading, setLoading, setError }) {
  const [status, setStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currId, setCurrId] = useState();

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(baseUrl + '/todos');
        if (response.ok) {
          const json = await response.json();
          setTodos(json);
        } else {
          throw response;
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, [loading]); // anyting listed in the dependency array can trigger a re-run of useEffetct

  async function changeHandler(e) {
    setCurrId(e.target.id)
    const body = JSON.stringify({
      done: e.target.checked,
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
      console.log(response);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setCurrId(null);

    }
  }

  async function deleteHandler(e) {
    try {
      setLoading(true);

      const response = await fetch(baseUrl + `todos/${e.target.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  if (todos.length === 0) return <h1>You don't have any todos</h1>;

  return (
    <div>
      {todos.map((todo, i) => (
        <Todo
          currId={currId}
          key={todo.id}
          todo={todo}
          changeHandler={changeHandler}
          deleteHandler={deleteHandler}
          loading={loading}
        />
      ))}
    </div>
  );
}
