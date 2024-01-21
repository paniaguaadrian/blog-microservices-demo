## Notes of each commit

#### Commit #1

On the first commit I've created a simple FE client with 2 simple BE services. I'm not using any database to store the data.
The services are creating posts and comments, and also displaying a list of posts and comments.

#### Commit #2

I'm adding a new service to the project called event-bus. There are some implementations that we can use for this like RabbitMQ or Kafka. For this project I will use an express service to act as an event bus.

It has also a refactor of the URL constants file.

With this implementation, post service and comment service will send an event to our event-bus, and then event-bus will send back that event to both services.

#### Commit #3

I'm adding a new service called query. With one request I will get a full list of all the posts and comments. It will take the events from the event-bus service, will assemble the data and send them with a get request to the client.

The cool idea about this is that now our client will receive the posts and comments from one single point which is the query service. But still will communicate with posts and comments service for the creation of those.

The best thing about this query service is that now we can kill or lose the posts and comments services, and we will still have access to the data of the posts thanks to the query service who has it.

## Endpoints

- @GET /posts -> returns a list of posts
- @GET /posts/:id/comments -> returns a list of comments for x postId

- @POST /posts -> creates a new post
- @POST /posts/:id/comments -> creates a new comment for x postId
- @POST /events -> creates a new event
