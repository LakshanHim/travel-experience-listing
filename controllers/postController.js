const Post = require("../models/Post");

// create post
const createPost = async (req, res, next) => {
  try {
    const { title, location, imageUrl, description, price } = req.body;

    // If an image file was uploaded via multer, use its path as imageUrl
    let finalImageUrl = imageUrl;
    if (req.file) {
      // store a path that can be served statically
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || !location || !finalImageUrl || !description) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    let post = await Post.create({
      title,
      location,
      imageUrl: finalImageUrl,
      description,
      price,
      user: req.user._id,
    });

    // populate user info and format returned object
    post = await Post.findById(post._id).populate('user', 'name email');

    const response = {
      title: post.title,
      location: post.location,
      imageUrl: post.imageUrl,
      price: post.price,
      shortDescription: post.shortDescription,
      description: post.description,
      user: post.user,
      postTime: post.createdAt ? new Date(post.createdAt).toISOString() : null,
      _id: post._id,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Map posts to the frontend-ready shape
    const mapped = posts.map((p) => ({
      _id: p._id,
      title: p.title,
      location: p.location,
      imageUrl: p.imageUrl,
      price: p.price,
      shortDescription: p.shortDescription,
      description: p.description,
      user: p.user,
      postTime: p.createdAt ? new Date(p.createdAt).toISOString() : null,
    }));

    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const response = {
      _id: post._id,
      title: post.title,
      location: post.location,
      imageUrl: post.imageUrl,
      price: post.price,
      shortDescription: post.shortDescription,
      user: post.user,
      postTime: post.createdAt ? new Date(post.createdAt).toISOString() : null,
      description: post.description,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.location = req.body.location || post.location;
    // If an image file was uploaded, replace imageUrl
    if (req.file) {
      post.imageUrl = `/uploads/${req.file.filename}`;
    } else {
      post.imageUrl = req.body.imageUrl || post.imageUrl;
    }
    post.description = req.body.description || post.description;
    // allow explicit shortDescription override; otherwise pre-save will generate it
    if (typeof req.body.shortDescription === 'string') {
      post.shortDescription = req.body.shortDescription;
    }
    post.price = req.body.price ?? post.price;

    const updatedPost = await post.save();

    // return frontend-ready shape
    const populated = await Post.findById(updatedPost._id).populate('user', 'name email');
    const response = {
      _id: populated._id,
      title: populated.title,
      location: populated.location,
      imageUrl: populated.imageUrl,
      price: populated.price,
      shortDescription: populated.shortDescription,
      user: populated.user,
      postTime: populated.createdAt ? new Date(populated.createdAt).toISOString() : null,
      description: populated.description,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};