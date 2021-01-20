import './App.css';
import React, {useState, useEffect} from 'react';


function Header(props) {
  
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <form>
      <label className="header--form">
        <a>R/</a>
        <input type="text" placeholder={props.value} onChange={handleChange} spellCheck="false"/>
      </label>
    </form>
  )
}

function Item(props) {
  const originalLink = "https://www.reddit.com"
  
  return (
    <div className="item">
      <img src={props.image}></img>
      <a href={originalLink + props.link}>{props.title}</a>
    </div>
  )
}

function App() {

  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('leagueoflegends');

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
      if (res.status != 200) {
        console.log("Error");
        return;
      }

      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children);
          console.log(subreddit);
        }
      });
    })
  },[articles])

  function handleChange(newValue) {
    setSubreddit(newValue);
  }

  return (
    <div>
      <Header value={subreddit} onChange={handleChange}/>
      {articles.map((i) =>
        <Item key={i.data.title} title={i.data.title} link={i.data.permalink}></Item>
      )}
    </div>
  )
}


export default App;
