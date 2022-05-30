const React = require('react')
const Default = require('./layouts/Default')

function Index ({breads}) {
    return (
    //   index.js is calling the web component Default
    // And then calling header 2, index page and alling the default
    // Then we are going to our breads controller
        <Default>
            <h2>Index Page</h2>
            {/* <p>I have {breads[0].name} bread!</p> */}
            {/* This is a JSX comment. */}
            <ul>
                {
                    // we're taking in bread as a parameter and from there doing bread.name
                    // in order to do that we're using the map function we erves as a callback
                    // and our key is going to be the index and per key we're going to add the breads name 
                    breads.map((bread, index)=> {
                        return (
                        <li key = {index}>
                            <a href={`/breads/${index}`}>
                                {bread.name}
                            </a>
                        </li>)
                    })
                }
            </ul> 
        </Default>
  
    )
}

module.exports = Index
