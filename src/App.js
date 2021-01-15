import './App.css';
import React from 'react';
import axios from 'axios';


let counter = 0;

function App() {

  
  let [recipe, setRecipe] = React.useState([]);

  async function getRecipe() {
    counter++;
    try {
      const response = await axios.get('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3');
      let recipeTitle = [];
      for(let i of response.data.results) {
        recipeTitle.push(i);
      }
      setRecipe(recipe.concat(recipeTitle));
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Recipies
        </h1>
        <button type='button' onClick={getRecipe}>Click for Data</button> 
        <ul>
          {recipe.map(i => (
            <li key={i.title}>
              {i.title} 
              <p>i.{i.ingredients}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
