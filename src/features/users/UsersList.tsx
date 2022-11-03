import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { selectAllUsers, User } from './usersSlice';

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user:User) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
