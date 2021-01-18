import './App.css';
import React, {useState, useEffect} from 'react';

function Item(props) {
  
  return (
    <div className="item">
      <h1>{props.title}</h1>
    </div>
  )
}

function App() {

  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('leagueoflegends');

  useEffect(() => {
    fetch("https://www.reddit.com/r/leagueoflegends.json").then(res => {
      if (res.status != 200) {
        console.log("Error");
        return;
      }

      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children);
          console.log(data.data.children[0].data);
        }
      });
    })
  })

  return (
    <div>
      <header>
        
      </header>
      {articles.map((i) =>
        <Item key={i.data.title} title={i.data.title} link={i.data.url}></Item>
      )}
    </div>
  )
}


export default App;
