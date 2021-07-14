import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function TodoForm({ setLoading, setError, loading, error }) {
  const [touched, setTouched] = useState(false);
  const [title, setTitle] = useState("");
  //@todo fråga om försöker lägga till befintlig todo

  async function saveTodo() {

    if (!title) {
      
    }
    const body = JSON.stringify({
      title,
      done: false,
      status: 'active',
      id: nanoid(),
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
        console.log('todo added ', body);
      } else {
        throw response;
      }
    } catch (error) {
      console.error('ERROR: ', error);
    } finally {
      setLoading(false);
    }
  }
  // @todo skapa state enums av status
  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo();
    // ?? is a "nullish coalescing operator", logical operator that returns values on the right if values on the left of the operand is null och undefined
  };

  const handleChange = (e) => {
    e.persist();
    setTitle(e.target.value);
  };

  const getErrors = () => {

  }
  return (
    <form className="pa4 black-80" onSubmit={handleSubmit}>
      <fieldset id="addTask" className="ba b--transparent ph0 mh0">
        <legend className="ph0 mh0 fw6 clip">Add a task</legend>
        <div className="mt3">
          <label className="db fw4 lh-copy f6" htmlFor="addTask">
            Task title
          </label>
          <input
            className="pa2 input-reset ba bg-transparent w-100 measure"
            type="text"
            placeholder="title"
            onChange={handleChange}
            value={title}
          />
        </div>
      </fieldset>
      <div className="mt3">
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
          type="submit"
          value="Add"
        />
      </div>
    </form>
  );
}
