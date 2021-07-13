import React, {useRef} from 'react';
import Spinner from './Spinner';

export default function Todo({ todo, changeHandler, loading, currId }) {
  const myRef = useRef(); // instance variable, värdet består även mellan renderingar

  // if (loading) return <h1>Loading</h1>;
  return (
    <>
    <div className="bg-white ba b--black-10 shadow-5">
      <ul ref={myRef}  className="measure center">
        <li className="flex items-center lh-copy pa3 ph0-l">
          {loading && currId === todo.id ? (
            <Spinner />
          ) : (
            <>
              <div className="flex-auto tl">{todo.title}</div>
              <input
                type="checkbox"
                id={todo.id}
                key={todo.id}
                checked={todo.done}
                onChange={(e) => changeHandler(e)}
              />
            </>
          )}
        </li>
      </ul>
    </div>
    </>
  );
}

// id't från specific component
// om id === komponentens id && loading { visa spinner}