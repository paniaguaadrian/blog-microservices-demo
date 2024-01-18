## Notes of each commit

#### Commit #1

On the first commit I've created a simple FE client with 2 simple BE services. I'm not using any database to store the data.
The services are creating posts and comments, and also displaying a list of posts and comments.

#### Commit #2

I'm adding a new service to the project called event-bus. There are some implementations that we can use for this like RabbitMQ or Kafka. For this project I will use an express service to act as an event bus.

It has also a refactor of the URL constants file.

With this implementation, post service and comment service will send an event to our event-bus, and then event-bus will send back that event to both services.

## Endpoints

- @GET /posts -> returns a list of posts
- @GET /posts/:id/comments -> returns a list of comments for x postId

- @POST /posts -> creates a new post
- @POST /posts/:id/comments -> creates a new comment for x postId
- @POST /events -> creates a new event
