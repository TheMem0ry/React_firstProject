import React, { useMemo, useState } from "react";
import PostItem from "./Components/PostItem";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import './styles/App.css'; 
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import PostFilter from "./Components/UI/PostFilter";

function App() {


  //Initializing a State for a PostList
  const [posts, setPosts] = useState([
    {id:1, title:'JavaScript', body:'Description'},
    {id:2, title:'React', body:'Description'},
    {id:5, title:'HTML/CSS', body:'Description'}
  ])
  
  const [filter, setFilter] = useState({sort:'', query:''})
 

  const sortedPosts = useMemo(() => {
    if(filter.sort){
      return [...posts].sort((a,b)=> a[filter.sort].localeCompare(b[filter.sort]))
    }
      return posts;
  }, [filter.sort, posts]) 

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase()))
  }, [filter.query, sortedPosts])
  

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

 

  return (
    <div className="App">
      <PostForm create={createPost}/>

      <hr style={{margin:'15px 0'}}></hr>
      <PostFilter filter = {filter} 
      setFilter = {setFilter}
      />
      {sortedAndSearchedPosts.length
      ? <PostList
          posts={sortedAndSearchedPosts}
          title='Post List Title'
          remove={removePost}/>
      : <h1 style={{color:'red', textAlign:'center'}}>There are no posts</h1>}
      
    </div>
  );
}

export default App;
