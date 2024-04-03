const db = require("../config/db");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");

// Controller for getting students by search string
const searchStudent = (req, res) => {
  const searchQuery = req.query.q;
  const searchParam = `%${searchQuery.toLowerCase()}%`;

  const searchStudentQuery = `
    SELECT * FROM students
    WHERE LOWER(name) LIKE ?
    OR LOWER(email) LIKE ?
  `;

  db.query(searchStudentQuery, [searchParam, searchParam], (err, result) => {
    if (err) {
      console.error("Error searching for students:", err);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json(result);
  });
};

// Controller for getting student marks by student id
const getStudentMarks = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT s.id, s.name, s.email, s.phone, sm.idea_marks, sm.execution_marks, sm.presentation_marks, sm.communication_marks, sm.total_marks
    FROM students AS s
    LEFT JOIN student_marks AS sm ON s.id = sm.student_id
    WHERE s.id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching student marks:", err);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json(result[0]);
  });
};

// Controller for generating PDF and sending email with PDF attached
const generatePDFandMail = async (req, res) => {
  const studentId = req.params.id;

  const query = `
    SELECT s.id, s.name, s.email, s.phone, sm.idea_marks, sm.execution_marks, sm.presentation_marks, sm.communication_marks, sm.total_marks
    FROM students AS s
    LEFT JOIN student_marks AS sm ON s.id = sm.student_id
    WHERE s.id = ?
  `;

  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error("Error fetching student data for PDF generation:", err);
      return res.status(500).send("Internal Server Error");
    }

    const student = result[0];
    const doc = new PDFDocument();

    // Set table header
    doc.font("Helvetica-Bold").text("Student Evaluation Report", { align: "center", size: 16 }).moveDown();

    // Set table rows
    doc.font("Helvetica").text("Parameter", 100, doc.y, { continued: true });
    doc.font("Helvetica").text("Marks", { align: "right" });

    // Iterate through student data
    const parameters = [
      { label: "Student Name", value: student.name },
      { label: "Student Email", value: student.email },
      { label: "Idea Score", value: student.idea_marks },
      { label: "Execution Score", value: student.execution_marks },
      { label: "Presentation Score", value: student.presentation_marks },
      { label: "Communication Score", value: student.communication_marks },
      { label: "Total Score", value: student.total_marks },
    ];

    parameters.forEach((param) => {
      doc.text(param.label, 100, doc.y, { continued: true });
      doc.text(param.value, { align: "right" });
    });

    // Generate PDF buffer
    let pdfBuffer = null;
    doc.on("data", (chunk) => {
      if (pdfBuffer === null) {
        pdfBuffer = chunk;
      } else {
        pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
      }
    });

    // Send email with PDF attached
    doc.on("end", () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: student.email,
        subject: "Your evaluation is complete",
        text: "Your final score is attached as a PDF",
        attachments: [
          {
            filename: "final-score.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Failed to send email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "Evaluation completed and email sent" });
        }
      });
    });

    doc.end();
  });
};

module.exports = { searchStudent, getStudentMarks, generatePDFandMail };
