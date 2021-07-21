import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import Spinner from '../components/Spinner';
import { TODOSTATUS } from '../utils/enums';
import { TodoInterface } from '../utils/Interfaces';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

interface TodosProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  todos: Array<TodoInterface>;
}

const Todos = ({ loading, todos, setLoading, setError, setOrder }: TodosProps) => {
  const [currId, setCurrId] = useState<null | string>(null); // Used to show loading spinner in specific todo on delete

  async function doneHandler(e: React.SyntheticEvent<HTMLFormElement>) {
    const target = e.target as HTMLFormElement;
    setCurrId(target.id);
    const isChecked = target.checked;

    const status = isChecked ? TODOSTATUS.DONE : TODOSTATUS.ACTIVE;
    const body = JSON.stringify({
      done: target.checked,
      status,
    });

    try {
      setLoading(true);

      const response = await fetch(baseUrl + `/todos/${target.id}`, {
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

  async function deleteHandler(id: string) {
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

  function orderHandler(e: React.PointerEvent<HTMLAnchorElement>) {
    const target = e.target as Element;
    setLoading(true);

    setOrder(target.id);
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

        {todos.map((todo, i) => (
          <Todo
            currId={currId!}
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
};

export default Todos;
