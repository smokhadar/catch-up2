// Import necessary libraries
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const Post = require('./models/Post');
const User = require('./models/User');
// Connect to MongoDB database 
mongoose.connect('mongodb://localhost/catchup2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a function to seed data
async function seedData() {
  try {

    await User.deleteMany({});
    await Post.deleteMany({});

    const users = [];
    for (let i = 0; i < 7; i++) {
      users.push({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: 'password123', // default password for testing
        profilePic: faker.image.avatar(),
      });
    }
    await User.create(users);

    // Generate and insert 7 posts
    const posts = [];
    for (let i = 0; i < 7; i++) {
      const randomUser = await User.findOne().skip(Math.floor(Math.random() * 7));
      posts.push({
        postText: faker.lorem.paragraph(),
        postAuthor: randomUser._id,
        likes: [],
        dislikes: [],
        comments: [],
      });
    }
    await Post.create(posts);

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
