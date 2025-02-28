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


  exports.getCurrnetUserPost= async (req, res) => {
    try {
     const posts = await PostModel.find({ userId: req.user.id }).populate("userId", "name email").sort({ createdAt: -1 });
      res.json(posts );
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  }




  exports.updatePost = async (req, res) => {
    try {
      const post = await PostModel.findOne({ _id: req.params.id, userId: req.user.id });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found or unauthorized" });
      }
  
      // Update fields if provided
      post.title = req.body.title || post.title;
      post.description = req.body.description || post.description;
      post.image = req.body.image || post.image;
  
      await post.save();
      res.json({ message: "Post updated successfully", post });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  };
  



  exports.deletePost = async (req, res) => {
    try {
      const post = await PostModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found or unauthorized" });
      }
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  };
  