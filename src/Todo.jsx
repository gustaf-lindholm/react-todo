import React, {useRef} from 'react';
import Spinner from './Spinner';

export default function Todo({ todo, doneHandler, deleteHandler, loading, currId }) {

  return (
    <>
    <div className="bg-white ba b--black-10 shadow-5">
      <ul className="measure center">
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
                onChange={doneHandler}
              />
              <button className="f6 link dim ph3 pv2 mb2 dib white bg-black" disabled={loading} onClick={(e) => deleteHandler(e, todo.id)}>DELETE</button>
            </>
          )}
        </li>
      </ul>
    </div>
    </>
  );
}