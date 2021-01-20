import './App.css';
import React, {useState, useEffect} from 'react';


function Header(props) {
  
  return (
    <form>
      <label className="header--form">
        <a>R/</a>
        <input type="text" placeholder={props.subredditTitle} spellCheck="false"/>
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
    fetch("https://www.reddit.com/r/leagueoflegends.json").then(res => {
      if (res.status != 200) {
        console.log("Error");
        return;
      }

      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children);
          console.log(data.data.children);
        }
      });
    })
  },[articles])

  

  return (
    <div>
      <Header subredditTitle={subreddit}/>
      {articles.map((i) =>
        <Item key={i.data.title} title={i.data.title} link={i.data.permalink}></Item>
      )}
    </div>
  )
}


export default App;
