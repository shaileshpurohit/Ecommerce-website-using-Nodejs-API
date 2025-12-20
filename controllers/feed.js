exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [
      {
        id: "1",
        title: "First Post",
        content: "This is the first post",
        author: "John Doe",
      },
      {
        id: "2",
        title: "Second Post",
        content: "This is the second post",
        author: "Jane Smith",
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // In a real application, you would save the post to the database here
  res.status(201).json({
    message: "Post created successfully",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      author: "John Doe",
    },
  });
};
