import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Spinner from './Spinner';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Todos({ error, loading, setLoading, setError, TODOSTATUS }) {
  const [status, setStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currId, setCurrId] = useState(null); // Used to show loading spinner in specific todo on delete
  const [sortOrder, setSortOrder] = useState("desc") // value and trigger for sorting the todos

  // @todo sortera på nyaste först
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
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, [loading, sortOrder]); // anyting listed in the dependency array can trigger a re-run of useEffetct

  async function changeHandler(e) {
    setCurrId(e.target.id);
    const body = JSON.stringify({
      done: e.target.checked,
      status: TODOSTATUS.DONE
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
      setError(error)
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
    setLoading(true)

    setSortOrder(e.target.id)
  }



  if (todos.length === 0) return <h1>You don't have any todos</h1>;
  if(loading && !currId) return <Spinner />
  return (
    <div>
    <a id="desc" className="pointer w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4" onClick={sortHandler}>&uarr;</a>
    <a id="asc" className="pointe w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4r" onClick={sortHandler}>&darr;</a>
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
