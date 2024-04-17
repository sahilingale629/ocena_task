import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./styles.css"; // Import CSS file for styling

const Form = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { name, course });
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Set default font and font size for the document
    doc.setFontSize(11);

    // Determine reference number based on the selected course
    const referenceNo = course === "BTech" ? "Ref- A101" : "Ref- B101";

    // Reference number with left alignment and gap
    doc.text(referenceNo, 20, 10);

    // Name with left alignment and gap
    doc.text(`Name: ${name}`, 20, 20);

    // Course with left alignment and gap
    doc.text(`Course: ${course}`, 20, 30);

    // Date of Offer (current date) with left alignment and gap
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date of Offer (current date): ${currentDate}`, 20, 40);

    // Fee structure table header with left alignment and gap
    doc.text("Fee structure :", 20, 50);

    // Course-specific content
    if (course === "BTech") {
      generateBTechPDF(doc);
    } else if (course === "MTech") {
      generateMTechPDF(doc);
    } else {
      doc.text("Select a course to generate PDF", 20, 60);
    }

    doc.save("form.pdf");
  };

  const generateBTechPDF = (doc) => {
    // Fee structure table for BTech with left alignment and gap
    const feeData = [
      ["Year", "One time fee", "Tuition fee"],
      ["1", "500", "160"],
      ["2", "-", "160"],
    ];

    doc.autoTable({
      startY: 60,
      head: [feeData[0]],
      body: feeData.slice(1),
      theme: "plain", // Set theme to 'plain' for no colors
      styles: { lineWidth: 0.4, lineColor: [0, 0, 0] }, // Set line width and color for borders
      headStyles: { fontStyle: "normal" }, // Remove bold style from headings
      margin: { left: 20 }, // Set left margin
    });
  };

  const generateMTechPDF = (doc) => {
    // Fee structure table for MTech with left alignment and gap
    const feeData = [
      ["Year", "One time fee", "Tuition fee"],
      ["1", "600", "260"],
      ["2", "-", "260"],
    ];

    doc.autoTable({
      startY: 60,
      head: [feeData[0]],
      body: feeData.slice(1),
      theme: "plain", // Set theme to 'plain' for no colors
      styles: { lineWidth: 0.4, lineColor: [0, 0, 0] }, // Set line width and color for borders
      headStyles: { fontStyle: "normal" }, // Remove bold style from headings
      margin: { left: 20 }, // Set left margin
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <select id="course" value={course} onChange={handleCourseChange}>
            <option value="">Select Course</option>
            <option value="BTech">BTech</option>
            <option value="MTech">MTech</option>
          </select>
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <button className="generate-pdf-btn" onClick={handleGeneratePDF}>
        Generate PDF
      </button>
    </div>
  );
};

export default Form;
