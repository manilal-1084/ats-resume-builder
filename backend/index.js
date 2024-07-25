const express = require('express');
const cors = require('cors'); // Import cors
const { generatePDF } = require('./pdfGenerator');

const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json());

app.post('/generate-resume', async (req, res) => {
  const { formData } = req.body;
  console.log('Received Form Data:', formData); // Debugging statement
  try {
    const pdfBuffer = await generatePDF(formData);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).send('Error generating resume');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
