This is a basic blog site where articles can be published read edited or removed

Functionality:
- User Authentication and Authorisation
- Articles can be read and liked
- Authors can write, edit and delete their articles

Endpoints:
/posts - shows all articles written
/posts/id - individual article identified with a unique id
/posts/new - write a new article
/posts/id/edit - alter a current article (Authorization required)
/profile - profile of authenticated user
/login - current user sign in
/register - create new user

Stack:
- Express.js framework used for the server
- MongoDB database used for data persistance
- ejs views used instead of a front-end framework for simplicity

Creator: Liam Wise
