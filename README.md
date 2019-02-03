## Practice Challenge
Welcome to BookLiker, where you can look at books and like them! (Hey, not all startups are brilliant ideas.)


#### Build the following application in Vanilla JS

![](example.gif)

- You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"goodwin"}]`, you should send as the body of your PATCH request:

```javascript
{
  "users": [
    {"id":2, "username":"auer"},
    {"id":8, "username":"goodwin"},
    {"id":1, "username":"pouros"}
  ]
}
```
- This route will respond with the updated book json including the list of users who have liked the book.
- BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?
