import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Spinner from './Spinner';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
//state enums 


export default function Todos({ error, loading, setLoading, setError, setOrder, todos, TODOSTATUS }) {

  const [currId, setCurrId] = useState(null); // Used to show loading spinner in specific todo on delete

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

  function orderHandler(e) {
    setLoading(true);

    setOrder(e.target.id);
  }

  if (todos.length === 0) return <h1>You don't have any todos</h1>;
  if (loading && !currId) return <Spinner />;
  return (
    <>

      <div>
        <a
          id="desc"
          className="pointer w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
          onClick={orderHandler}
        >
          &uarr;
        </a>
        <a
          id="asc"
          className="pointe w-auto f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4r"
          onClick={orderHandler}
        >
          &darr;
        </a>

        {
          todos.map((todo, i) => (
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
