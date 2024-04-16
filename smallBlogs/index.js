import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI.js';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';

fetch(USERS_API)
  .then(response => response.json())
  .then(data => fillUsersSelect(data.users));
  
usersSelect.addEventListener('change', () => {
  clearPageData();
  const UserID = usersSelect.value;

fetch(`https://dummyjson.com/posts/user/${UserID}`)
  .then(response => response.json())
  .then(data => {
    fillPosts(data.posts)
    
    const [featuredPost] = data.posts;
    return fetch(`https://dummyjson.com/posts/${featuredPost.id}/comments`)
  })
    .then(response => response.json())
    .then(data => fillFeaturedPostComments(data.comments))
    .catch(error => fillErrorMessage('Error', error.message));
});
