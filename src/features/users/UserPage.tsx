import { EntityId } from '@reduxjs/toolkit';
import React from 'react'
import { Link, useParams, useRevalidator } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Post, selectAllPosts, selectPostsByUser } from '../posts/postsSlice';
import { selectUserById, User } from './usersSlice';

export const UserPage = () => {

  const {userId} = useParams();

  
  const user = useAppSelector((state:RootState) => selectUserById(state, userId!));

  const postsForUser = useAppSelector((state:RootState) => selectPostsByUser(state, userId!));

  const postTitles = postsForUser.map((post:Post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  if(!user) {
    return <div>No User</div>
  }

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
