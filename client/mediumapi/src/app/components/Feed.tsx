import { useState } from "react";
import { FaBookmark, FaHeart, FaComment } from "react-icons/fa";
import Post from "./Post";

const posts = [
  {
    id: 1,
    post_desc: "teste",
    img: "",
    username: "user",
    userImg: "",
  },
  {
    id: 2,
    post_desc: "teste",
    img: "https://png.pngtree.com/background/20230408/original/pngtree-natural-landscape-in-the-forest-with-waterfall-flowing-through-picture-image_2337676.jpg",
    username: "user",
    userImg: "",
  }
];

function Feed() {
  return <div>
    {posts.map((post, id) => {
      return(
        <Post post={post} key={id}/>
      )
    })}
  </div>
}

export default Feed;
