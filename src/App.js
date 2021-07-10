import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChange = (e) => {
    e.persist();
    setTitle(e.target.value);
    console.log(title);
  };
  return (
    <div className="App fl w-100 pa6-ns tc">
      <header className="App-header">
        <ul>
          <li>Header </li>
        </ul>
      </header>
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
      <div>
        <h2>Tasks</h2>
        <a className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">All</span>
        </a>
        <a className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Active</span>
        </a>
        <a className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4">
          <span className="pl1">Completed</span>
        </a>
      </div>
      <div className="bg-white center mw5 ba b--black-10 mv4">
        <div className="pv2 ph3">
          <h1 className="f6 ttu tracked">{`{taskTitle}`}</h1>
        </div>
        {/* <img
          src="http://tachyons.io/img/cat-720.jpg"
          className="w-100 db"
          alt="Closeup photo of a tabby cat yawning."
        /> */}
        <div className="pa3">{`{taskStatus}`}</div>
      </div>
    </div>
  );
}

export default App;
