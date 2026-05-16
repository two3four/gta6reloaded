const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Database helper
const DB_PATH = path.join(__dirname, 'data', 'posts.json');

function readPosts() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
}

function savePosts(posts) {
    fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2));
}

// API Routes
app.get('/api/posts', (req, res) => {
    res.json(readPosts());
});

app.post('/api/posts', upload.single('image'), (req, res) => {
    const { title, content, category, author } = req.body;
    const posts = readPosts();
    
    const newPost = {
        id: Date.now(),
        title,
        content,
        category,
        author,
        date: new Date().toLocaleDateString(),
        image: req.file ? `/uploads/${req.file.filename}` : null
    };
    
    posts.unshift(newPost); // Add to beginning
    savePosts(posts);
    res.json({ success: true, post: newPost });
});

app.delete('/api/posts/:id', (req, res) => {
    let posts = readPosts();
    posts = posts.filter(p => p.id != req.params.id);
    savePosts(posts);
    res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`GTA6Reloaded running at http://localhost:${PORT}`);
});
