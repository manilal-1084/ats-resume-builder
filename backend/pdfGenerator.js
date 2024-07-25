const { PDFDocument, rgb } = require('pdf-lib');

const generatePDF = async (formData) => {

  console.log('Generating PDF for data:', formData); // Debugging statement
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { name, email, phone, linkedin, skills, workExperience, projects, education, hobbies, achievements, awards, extracurricular } = formData;

  // Set font size and color
  const fontSize = 12;
  const lineSpacing = 20;
  let y = page.getHeight() - 40;

  const drawText = (text) => {
    page.drawText(text, { x: 50, y, size: fontSize, color: rgb(0, 0, 0) });
    y -= lineSpacing;
  };

  drawText(`Name: ${name}`);
  drawText(`Email: ${email}`);
  drawText(`Phone: ${phone}`);
  drawText(`LinkedIn: ${linkedin}`);

  if (skills.length > 0) {
    drawText(`Skills: ${skills.join(', ')}`);
  }

  if (workExperience.length > 0) {
    drawText(`Work Experience:`);
    workExperience.forEach((experience) => {
      drawText(`- ${experience}`);
    });
  }

  if (projects.length > 0) {
    drawText(`Projects:`);
    projects.forEach((project) => {
      drawText(`- ${project}`);
    });
  }

  if (education.length > 0) {
    drawText(`Education:`);
    education.forEach((edu) => {
      drawText(`- ${edu}`);
    });
  }

  if (hobbies) {
    drawText(`Hobbies: ${hobbies}`);
  }

  if (achievements) {
    drawText(`Achievements: ${achievements}`);
  }

  if (awards) {
    drawText(`Awards: ${awards}`);
  }

  if (extracurricular) {
    drawText(`Extracurricular: ${extracurricular}`);
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

module.exports = { generatePDF };
