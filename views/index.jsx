// Views is what we're going to be utilizing in terms of showcasing the server side rendered information
// Model views controller is actually the design pattern that is the main uses case for developing
const React = require("react");
const Default = require("./layouts/Default");

function Index({ breads, bakers, title }) {
  return (
    //   index.js is calling the web component Default
    // And then calling header 2, index page and alling the default
    // Then we are going to our breads controller
    <Default title={title}>
      <h2>Index Page</h2>
      <h3>Bakers</h3>
      <ul>
        {bakers.map((baker) => {
          return (
            <li key={baker._id}>
              <a href={`/bakers/${baker._id}`}>{baker.name}</a>
            </li>
          );
        })}
      </ul>
      <h3>Breads</h3>
      {/* <p>I have {breads[0].name} bread!</p> */}
      {/* This is a JSX comment. */}
      <ul>
        {
          // we're taking in bread as a parameter and from there doing bread.name
          // in order to do that we're using the map function we erves as a callback
          // and our key is going to be the index and per key we're going to add the breads name
          breads.map((bread, index) => {
            return (
              <li key={bread._id}>
                <a href={`/breads/${bread._id}`}>{bread.name}</a>
              </li>
            );
          })
        }
      </ul>
      <div className="newButton">
        <a href="/breads/new">
          <button>Add a new bread</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = Index;

