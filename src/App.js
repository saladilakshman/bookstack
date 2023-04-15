
import './App.css';
import axios from "axios";
import React,{useState,useEffect} from "react";
import Error from "./error";
import blob from "./assets/magicpattern-blob-1680846283842.png";
import logo from "./assets/books.png";
import gif from "./assets/open-book.gif";
import nopic from "./assets/no-pictures.png";
import {RxCross1} from "react-icons/rx";
import Fade from 'react-reveal/Fade';
import student from "./assets/icons8-team-FcLyt7lW5wg-unsplash-removebg-preview.png"
function App() {
  const[load,setLoad]=useState(true);
  const[booklist,setBooklist]=useState([]);
  const[err,setErr]=useState();
  const[query,setQuery]=useState('politics');
  const[book,setBook]=useState({});
  const[hide,setHide]=useState(false);
  const[isSpeakerOpen,setIsSpeakerOpen]=useState('Play');

  /**fetching the data from server */
  useEffect(()=>{
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyAbcjWorqkRC0WNXJ7MPKbQ51wQcVySbs4`)
    .then(response=>{
      if(response.status===200){
        setBooklist(response.data.items)
        setLoad(false)
        setErr(err)
      }
      else{
        //setLoad(false)
        setBooklist([])
        setErr(prevState=>!prevState)
      }
    })
    .catch((err)=>console.log(err.message))
  },[query,err])

  /**fetching the booklist by using the user entered value */
  const booksearching=()=>{
    const searchInput=document.querySelector('.search-input');
    //if user clicked on search button without entering the text on searh-filed window will display a popup for alert
    if(searchInput.value===""){
      window.alert('please fill the field');
    }
    else{
      setQuery(searchInput.value.toLowerCase())
      setLoad(true)
  setBooklist([])
    }
  }

  /**Modal componet should open when user clicks on bookcard based on its id */
  const bookOneDesc=(id)=>{
const singleBook=booklist.find((item)=>item.id===id);
setBook(singleBook)
setHide(prevState=>!prevState);
document.body.classList.add('stales');
  }


  /**text to speech generation API for hearing the description of the specific book */
  const textVoiceGeneration=()=>{
const bookdesc=document.getElementById('text');
const cancelIcon=document.querySelector('.cancel-icon');
    const tts=window.speechSynthesis;
const text=new SpeechSynthesisUtterance(bookdesc.innerText);
//I choosed Indian origin voice from voice object
const indianVoice=tts.getVoices().find((el)=>el.lang==="en-IN");
text.voice=indianVoice
text.onend=()=>{
  setIsSpeakerOpen("Play");
}

if(isSpeakerOpen==="Play"){
  setIsSpeakerOpen("Pause")
  tts.speak(text)
  //when user clicks on cancel icon it should stop generating text to voice text
  cancelIcon.onclick=()=>{
    tts.cancel(text)
  }
  return
}
 if(isSpeakerOpen==="Pause"){
setIsSpeakerOpen("Play")
tts.cancel(text)
return
}

  }
  
  return (
    <div className="App">
    <header>
      <img src={logo}alt=""loading="lazy"style={{width:'4rem'}}/>
      <h1 className="logo-name">BookStack</h1>
    </header>
    <main>
      <div className="intro">
      <div className="intro-text">
        <h2 className="intro-txt">Explore your favourite<br/> Author writings here</h2>
        <div style={{display:'flex',gap:'1rem',marginBlockStart:'1rem'}}>
        <input type="search"className="search-input"/>
        <button className="search-button"onClick={booksearching}>search</button>
        </div>
        
      </div>
      <div className="intro-images">
      <img src={blob}alt=""className="blob"/>
      <img src={student}alt=""className="book"/>
      </div>
      </div>
      {load &&<div>
       <img src={gif}alt="gif"className="gif"/>
        </div>}

<div style={{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginBlockStart:'2rem'
}}>
        <div className="books">
        {booklist &&booklist.map((book)=>{
          const{id,volumeInfo}=book;
          return <Fade big>
          <div key={id} className="book-card"onClick={()=>bookOneDesc(id)}>
<img src={volumeInfo?.imageLinks?.thumbnail??nopic}alt=""loading="lazy"className="book-image"/>
<h4 className="book-title">{volumeInfo.title}</h4>
<h4 className="book-author">Authors: <span>{volumeInfo.hasOwnProperty('authors')?
new Intl.ListFormat("en",{style:'long',type:'conjunction'}).format(volumeInfo.authors):"Unknown"}</span></h4>
          </div></Fade>
        })}
        </div>
</div>
        {err&&<h3>No books found</h3>}
        {hide &&<Fade big>
        <div className="overlay">
          <div className="overlay-content">
            <div>
          <RxCross1 onClick={()=>{
            setHide(prevState=>!prevState)
            const overlayEffect=document.querySelector('.overlay');
            overlayEffect.classList.add('layout-effect')
          }
            } className="cancel-icon"/>
          </div>
         {book.volumeInfo.hasOwnProperty('description')?<div className="overlay-context">
            <img src={book.volumeInfo.imageLinks.smallThumbnail}alt=""/>
            <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between'}}>
            <h4 className="book-desc">publisher: <span>{book.volumeInfo.publisher}</span></h4>
              <button onClick={textVoiceGeneration}className="speaker-icon">{isSpeakerOpen}</button>
            </div>
    <h4 className="book-desc"id="text">Description: <span>{book.volumeInfo.description}</span></h4>
     </div>:<Error/>}
          </div>
        </div>
        </Fade>}
    </main>
    </div>
  );
}

export default App;
