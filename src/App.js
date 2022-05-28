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
import MyModal from "./Components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts.js"

function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'JavaScript', body:'Description'},
    {id:2, title:'React', body:'Description'},
    {id:5, title:'HTML/CSS', body:'Description'}
  ])
  
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts,filter.sort, filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

 

  return (
    <div className="App">
      
      <MyButton style={{marginTop:'30px'}}
      onClick={() => setModal(true)}
      >Create Post</MyButton>
      <MyModal 
      visible={modal}
      setVisible = {setModal}
      >
      <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin:'15px 0'}}></hr>
      <PostFilter filter = {filter} 
      setFilter = {setFilter}
      />
       <PostList
          posts={sortedAndSearchedPosts}
          title='Post List Title'
          remove={removePost}/>
    </div>
  );
}

export default App;
