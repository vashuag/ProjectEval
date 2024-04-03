async function searchMentor(searchQuery) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/search?q=${searchQuery}`);

  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

async function getAssignedStudents(mentorId) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/${mentorId}/students`);
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

async function assignStudent(mentorId, studentIds) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mentorId, studentIds }),
  });
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

async function unassignStudent(mentorId, studentId) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/unassign/${mentorId}/students/${studentId}`, {
    method: "DELETE",
  });
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

async function markStudent(mentorId, studentId, marksData) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/${mentorId}/students/${studentId}/marks`, {
    method: "POST",
    body: JSON.stringify(marksData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

async function evaluateStudent(mentorId, studentId) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/evaluate/${mentorId}/students/${studentId}`, {
    method: "POST",
  });
  if(response.status === 200){
    await sendMail(studentId);
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.json();
  }
}

async function sendMail(studentId) {
  const response = await fetch(`https://projecteval-1.onrender.com/students/send-mail-pdf/${studentId}`, {
    method: "POST",
  });
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.json();
  }
}

async function searchStudent(searchQuery) {
  const response = await fetch(`https://projecteval-1.onrender.com/students/search?q=${searchQuery}`);
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.json();
  }
}

async function getStudentMarks(id) {
  const response = await fetch(`https://projecteval-1.onrender.com/students/student-marks/${id}`);
  if(response.status === 200){
    try {
      return await response.json();
    } catch(e) {
      return {};
    }
  } else {
    return await response.json();
  }
}

async function lockMarks(mentorId) {
  const response = await fetch(`https://projecteval-1.onrender.com/mentors/${mentorId}/lock-marks`, {
    method: "POST",
  });
  if (response.status === 200) {
    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  } else {
    return await response.text();
  }
}

// other functions

export {
  searchMentor,
  assignStudent,
  unassignStudent,
  getAssignedStudents,
  markStudent,
  evaluateStudent,
  searchStudent,
  getStudentMarks,
  lockMarks, // Add lockMarks function to exports
};


