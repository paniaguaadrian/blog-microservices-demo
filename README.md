## Notes of each commit

#### Commit #1

On the first commit I've created a simple FE client with 2 simple BE services. I'm not using any database to store the data.
The services are creating posts and comments, and also displaying a list of posts and comments.

## Endpoints

- @GET /posts -> returns a list of posts
- @GET /posts/:id/comments -> returns a list of comments for x postId

- @POST /posts -> creates a new post
- @POST /posts/:id/comments -> creates a new comment for x postId
