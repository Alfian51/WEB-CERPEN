const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files like HTML, CSS, JS

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
