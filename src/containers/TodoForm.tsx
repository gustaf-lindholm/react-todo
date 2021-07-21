import * as React from 'react';
import { nanoid } from 'nanoid';
import { TODOSTATUS } from '../utils/enums';
import { TodoInterface } from '../utils/Interfaces';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

interface FormProps {
  setLoading(arg: boolean) : void;
  setError(arg: boolean) : void;
  todos : Array<TodoInterface> | [];
}

const emptyTodo = {
  title: '',
  done: false,
  status: TODOSTATUS.ACTIVE,
  id: "",
  added: 0
};

interface FormErrors {
  title : string
}

const TodoForm = ({setLoading, setError, todos } : FormProps ) => {
  const [todo, setTodo] = React.useState<TodoInterface>(emptyTodo);
  const [touched, setTouched] = React.useState<Object>({});
  const [confirmAdd, setConfirmAdd] = React.useState<Boolean | null>();
  const [isDuplicate, setIsDuplicate] = React.useState<Boolean>(false);

  //derived state
  const formErrors = getErrors(todo);

  // // if the error object is empty, there are no errors
  let isValid = Boolean(Object.keys(formErrors).length === 0);

  // false if not touched
  let isTouched = Boolean(Object.keys(touched).length !== 0);

  function getErrors(todo : TodoInterface) {
    const result : FormErrors = { title: ""};
    if (!todo.title) result.title = 'Title is required';
    return result;
  }

  function checkForDuplicate() {
    // take todo.title and compare with todos.title
    const duplicate = todos.filter((t, index) => {
      return t.title === todo.title;
    });

    // if there is a duplicate, we need to set state to be able to pause before deciding on saving todo
    duplicate ? setConfirmAdd(false) : setConfirmAdd(true);
    setIsDuplicate(true);
  }

  async function saveTodo() {

    //before saving - check if todo-title already exists
     // if there's a duplicate - pause and ask for user confirmation
    checkForDuplicate();

    // if confirm yes, continue saving
    if (confirmAdd) {
      const body = JSON.stringify({
        ...todo,
        done: false,
        status: TODOSTATUS.ACTIVE,
        id: nanoid(),
        added: Date.now(),
      });

      try {
        setLoading(true)
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
        setConfirmAdd(null);
        setIsDuplicate(false);
      }
    }

    // if user don't want to add duplicate, clear state to default
    if (confirmAdd === false) {
      setTodo((current) => {
        return { ...current, title: '' };
      });
      setTouched({});
      setConfirmAdd(null);
      setIsDuplicate(false);
    }
  }

  function handleSubmit(e : React.PointerEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isValid) {
      saveTodo();
    }
  }

  function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    setTodo((current) => {
      return { ...current, [e.target.id]: e.target.value };
    });
  }

  function handleBlur(e : React.ChangeEvent<HTMLInputElement>) {
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
        <div id="confirm-add" hidden={!isDuplicate}>
          <p>You already have a todo with {todo.title}. Do you want to add it anyway?</p>
          <button onClick={() => setConfirmAdd(true)}>Yes</button>
          <button onClick={() => setConfirmAdd(false)}>No</button>
        </div>
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
          type="submit"
          value="Add"
          id="add"
          // onClick={handleBlur}
        />
      </div>
    </form>
  );
}

export default TodoForm;