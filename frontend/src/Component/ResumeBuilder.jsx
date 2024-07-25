import React, { useState } from 'react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    skills: [],
    workExperience: [],
    projects: [],
    education: [],
    hobbies: '',
    achievements: '',
    awards: '',
    extracurricular: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSectionChange = (section, index, value) => {
    const newSection = [...formData[section]];
    newSection[index] = value;
    setFormData({ ...formData, [section]: newSection });
  };

  const handleAddSection = (section) => {
    setFormData({ ...formData, [section]: [...formData[section], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debugging statement
    try {
      const response = await axios.post('http://localhost:5000/generate-resume', { formData }, { responseType: 'blob' });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} required />
      
      {/* Add more sections for skills, work experience, etc. */}
      
      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeBuilder;
