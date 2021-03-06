import React from "react";
import MyButton from "./UI/button/MyButton";
import PostList from "./PostList";
import PostForm from "./PostForm";

const PostItem = (props) => {
   
  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>{props.post.body}</div>
      </div>

      <div className="post__btns">
        <MyButton onClick= {() => props.remove(props.post)}>Delete Post</MyButton>
      </div>
    </div>
  );
};

export default PostItem;