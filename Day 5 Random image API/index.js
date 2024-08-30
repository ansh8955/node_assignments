const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/image/random', async (req, res) => {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random?client_id=iVF4Jb2YIhP__7x9trEAM3DEoZ_lhP9pVtZBm045cZw', 
         
    );
        console.log('Image URL:', response.data.urls.full);

        // res.redirect(response.data.urls.full);
        res.json({"success":"true","image-link":response.data.urls.full})
    } catch (error) {
        console.error('Error fetching random image:', error.message);
        res.status(500).send('Error fetching random image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});