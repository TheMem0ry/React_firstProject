import React, { useMemo, useState, useEffect } from "react";
import PostItem from "./Components/PostItem";
import Counter from "./Components/Counter";
import ClassCounter from "./Components/ClassCounter";
import './styles/App.css'; 
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts.js"
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./Components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages.js"

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts,filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  let pagesArray = getPagesArray(totalPages)

  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
      {postError &&
      <h1>There was a fetching error {postError}</h1>
      }

      {isPostsLoading
      ? <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}><Loader></Loader></div>
      : <PostList
      posts={sortedAndSearchedPosts}
      title='Post List Title'
      remove={removePost}/>
      }
     
     <div className="pages__wrapper">
        {pagesArray.map((p) => 
          <span 
          className={page === p ? 'page page__current' : 'page'} 
          key={p}
          onClick={() => changePage(p)}
          >
            {p}
            </span>
          )}
     </div>
    </div>
  );
}

export default App;
