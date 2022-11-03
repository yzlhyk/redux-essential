import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { selectUserById, User } from '../users/usersSlice';

export const PostAuthor = ({userId}:{userId:EntityId}) => {
  const author = useAppSelector((state:RootState) => 
    selectUserById(state, userId)
  )
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
