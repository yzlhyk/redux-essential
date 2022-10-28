import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { PostState } from './postsSlice';

const PostsList = () => {
  const posts = useSelector((state:RootState) => state.posts);

  const renderedPosts = posts.map((post:PostState) => (
    <article className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0,100)}</p>
    </article>
  ))
  return (
    <section className='posts-list'>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList