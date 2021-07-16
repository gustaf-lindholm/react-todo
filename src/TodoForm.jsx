import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


const emptyTodo = {
  title: '',
};

export default function TodoForm({ setLoading, setError, TODOSTATUS }) {
  const [todo, setTodo] = useState(emptyTodo);
  const [touched, setTouched] = useState({});
  //@todo fråga om försöker lägga till befintlig todo

  //derived state
  const formErrors = getErrors(todo);

  // // if the error object is empty, there are no errors
  let isValid = Boolean(Object.keys(formErrors).length === 0);

  // false if not touched
  let isTouched = Boolean(Object.keys(touched).length !== 0);

  function getErrors(todo) {
    const result = {};
    if (!todo.title) result.title = 'Title is required';
    return result;
  }

  async function saveTodo() {
    const body = JSON.stringify({
      ...todo,
      done: false,
      status: TODOSTATUS.ACTIVE,
      id: nanoid(),
      added: Date.now(),
    });

    try {
      setLoading(true);
      const response = await fetch(baseUrl + '/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (response.ok) {
      } else {
        throw response;
      }
    } catch (error) {
      console.error('ERROR: ', error);
      setError(error);
    } finally {
      setLoading(false);
      setTodo((current) => {
        return { ...current, title: '' };
      });
      setTouched({});
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      saveTodo();
    }
  }

  function handleChange(e) {
    e.persist();
    setTodo((current) => {
      return { ...current, [e.target.id]: e.target.value };
    });
  }

  function handleBlur(e) {
    e.persist();
    setTouched((current) => {
      return { ...current, [e.target.id]: true };
    });
  }

  return (
    <form className="pa4 black-80" onSubmit={handleSubmit}>
      <fieldset id="addTask" className="ba b--transparent ph0 mh0">
        <legend className="ph0 mh0 fw6 clip">Add a task</legend>
        <div className="mt3">
          <label
            className={`db fw4 lh-copy f6 ${isTouched && !isValid ? 'red' : ''}`}
            htmlFor="addTask"
          >
            {!isValid && isTouched ? `${formErrors.title}` : 'Task title'}
          </label>
          <input
            id="title"
            className="pa2 input-reset ba bg-transparent w-100 measure"
            type="text"
            placeholder="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={todo.title}
          />
        </div>
      </fieldset>
      <div className="mt3">
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
          type="submit"
          value="Add"
          id="add"
          onClick={handleBlur}
        />
      </div>
    </form>
  );
}
