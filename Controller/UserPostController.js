const PostModel=require('../Model/PostModel')

exports.userPost= async (req, res) => {
    try {
      const { title, description } = req.body;
      console.log(req.body)
      if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
      }
  
      console.log(req.user)

      const newPost = {
        userId:req.user.id,
        title,
        description,
        Image: req.file.path,
      };
      let post=PostModel(newPost)
      await post.save()
  
    //   await newPost.save();
      res.json({ message: "Post created successfully", newPost});
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  }



  exports.getPost= async (req, res) => {
    try {
      const posts = await PostModel.find().populate("userId", "name email").sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  }