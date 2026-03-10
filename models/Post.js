const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Generate shortDescription automatically before saving when not provided
postSchema.pre('save', function () {
  if (this.description) {
    const max = 100;
    const desc = this.description.trim();
    if (!this.shortDescription || this.isModified('description')) {
      this.shortDescription = desc.length > max ? desc.slice(0, max).trim() + '...' : desc;
    }
  }
});

// Add a JSON transform so createdAt is available as-is; controllers will format it
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("Post", postSchema);