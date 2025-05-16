//APLLICATION PAGE
document.getElementById("marksForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get all subject marks
  const math = parseInt(document.getElementById("math").value) || 0;
  const english = parseInt(document.getElementById("english").value) || 0;
  const physics = parseInt(document.getElementById("physics").value) || 0;
  const computers = parseInt(document.getElementById("computers").value) || 0;
  const accounting = parseInt(document.getElementById("accounting").value) || 0;

  // Debug: Log inputs
  console.log("Input Marks:", {
    Math: math,
    English: english,
    Physics: physics,
    Computer: computers,
    Accounting: accounting,
  });

  const aps = calculateAPS(math, english, physics, computers, accounting);
  console.log("Calculated APS:", aps);

  const eligibleCourses = checkEligibility(
    aps,
    math,
    english,
    physics,
    computers,
    accounting
  );
  console.log("Eligible Courses:", eligibleCourses);

  displayResults(eligibleCourses, aps);
});

function calculateAPS(math, english, physics, computers, accounting) {
  // Calculate APS points for each subject (1% = 1 point, capped at 7)
  const mathPoints = Math.min(Math.floor(math / 10), 7);
  const englishPoints = Math.min(Math.floor(english / 10), 7);
  const physicsPoints = Math.min(Math.floor(physics / 10), 7);
  const computersPoints = Math.min(Math.floor(computers / 10), 7);
  const accountingPoints = Math.min(Math.floor(accounting / 10), 7);

  // Sum top 6 subjects (including math and english)
  return (
    mathPoints +
    englishPoints +
    physicsPoints +
    computersPoints +
    accountingPoints
    // Math.max(physicsPoints, computersPoints, accountingPoints)
  );
}

function checkEligibility(aps, math, english, physics, computers, accounting) {
  const courses = [
    {
      name: "Diploma in IT (TUT)",
      requiredAPS: 18,
      requiredSubjects: { math: 50, english: 50, computers: 55 },
      description: "Introductory IT and networking fundamentals.",
      applyLink: "https://www.tut.ac.za",
    },
    {
      name: "Certificate in Office Admin (UNISA)",
      requiredAPS: 15,
      requiredSubjects: { english: 50 },
      description: "Basic office management and computer skills.",
      applyLink: "https://www.unisa.ac.za",
    },
    {
      name: "Higher Certificate in Law (UJ)",
      requiredAPS: 20,
      requiredSubjects: { english: 60 },
      description: "Introduction to legal concepts and practice.",
      applyLink: "https://www.uj.ac.za",
    },
    {
      name: "Diploma in Tourism (CPUT)",
      requiredAPS: 22,
      requiredSubjects: { english: 60, geography: 50 },
      description: "Tourism management and hospitality operations.",
      applyLink: "https://www.cput.ac.za",
    },
    {
      name: "BSc Environmental Health (DUT)",
      requiredAPS: 25,
      requiredSubjects: { math: 50, english: 60, lifeScience: 55 },
      description: "Public health and environmental protection.",
      applyLink: "https://www.dut.ac.za",
    },
    {
      name: "BA Communication (NWU)",
      requiredAPS: 28,
      requiredSubjects: { english: 65 },
      description: "Media studies and corporate communication.",
      applyLink: "https://www.nwu.ac.za",
    },
    {
      name: "BCom General (UFS)",
      requiredAPS: 30,
      requiredSubjects: { math: 55, english: 60 },
      description: "General business and economics foundation.",
      applyLink: "https://www.ufs.ac.za",
    },
    {
      name: "BSc Biological Sciences (WSU)",
      requiredAPS: 32,
      requiredSubjects: { math: 50, english: 60, lifeScience: 60 },
      description: "Genetics, microbiology and biotechnology.",
      applyLink: "https://www.wsu.ac.za",
    },
    {
      name: "BA Psychology (VUT)",
      requiredAPS: 28,
      requiredSubjects: { english: 65, lifeScience: 50 },
      description: "Human behavior and mental processes.",
      applyLink: "https://www.vut.ac.za",
    },
    {
      name: "Diploma in Civil Engineering (CUT)",
      requiredAPS: 24,
      requiredSubjects: { math: 60, english: 50, physics: 55 },
      description: "Infrastructure design and construction.",
      applyLink: "https://www.cut.ac.za",
    },
    {
      name: "BEd Foundation Phase (UP)",
      requiredAPS: 30,
      requiredSubjects: { english: 60, math: 50 },
      description: "Early childhood education training.",
      applyLink: "https://www.up.ac.za",
    },
    {
      name: "Diploma in Accounting (NMMU)",
      requiredAPS: 26,
      requiredSubjects: { math: 55, english: 60 },
      description: "Financial accounting and taxation.",
      applyLink: "https://www.mandela.ac.za",
    },
    {
      name: "Higher Certificate in Marketing (Varsity College)",
      requiredAPS: 18,
      requiredSubjects: { english: 55 },
      description: "Digital marketing and brand management.",
      applyLink: "https://www.varsitycollege.co.za",
    },
    {
      name: "Diploma in Public Management (DUT)",
      requiredAPS: 22,
      requiredSubjects: { english: 60, arts: 50 },
      description: "Public administration and governance.",
      applyLink: "https://www.dut.ac.za",
    },
    {
      name: "BSc Information Technology (UJ)",
      requiredAPS: 32,
      requiredSubjects: { math: 60, english: 50, computers: 55 },
      description: "Software development and systems analysis.",
      applyLink: "https://www.uj.ac.za",
    },
  ];

  return courses.filter((course) => {
    const req = course.requiredSubjects;
    return (
      aps >= course.requiredAPS &&
      math >= (req.math || 0) &&
      english >= (req.english || 0) &&
      computers >= (req.computers || 0) &&
      physics >= (req.physics || 0) &&
      accounting >= (req.accounting || 0)
    );
  });
}

function displayResults(courses, userAPS) {
  // Added userAPS parameter
  const resultsDiv = document.getElementById("results");
  const coursesList = document.getElementById("coursesList");
  coursesList.innerHTML = "";

  if (courses.length === 0) {
    coursesList.innerHTML =
      '<li class="course-card">No courses found. Try higher marks!</li>';
  } else {
    courses.forEach((course) => {
      const card = document.createElement("div");
      card.className = "course-card";

      // Generate subject requirements string
      const subjectRequirements = [];
      for (const [subject, minMark] of Object.entries(
        course.requiredSubjects
      )) {
        if (minMark > 0) {
          subjectRequirements.push(`${subject} ≥ ${minMark}%`);
        }
      }

      card.innerHTML = `
        <h3>${course.name}</h3>
        <div class="aps-display">
          <span class="aps-label">Your APS:</span>
          <span class="aps-score ${
            userAPS >= course.requiredAPS ? "pass" : "fail"
          }">
            ${userAPS}
          </span>
          <span class="aps-label">Required APS:</span>
          <span class="aps-required">${course.requiredAPS}</span>
        </div>
        <p>${subjectRequirements.join(" | ")}</p>
        <p><a href="${course.applyLink}" target="_blank" class="apply-btn">
          Apply Now <i class="fas fa-external-link-alt"></i>
        </a></p>
        <p class="course-description">${course.description}</p>
      `;
      coursesList.appendChild(card);
    });
  }
  resultsDiv.classList.remove("hidden");
}
// LOGOUT
// Logout Button Functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Clear user session (example: remove stored data)
  localStorage.removeItem("userLoggedIn");

  // Redirect to login page
  window.location.href = "LogInPage.html"; // Replace with your login page
});

//   // Optional: Check login state on page load
//   window.addEventListener("DOMContentLoaded", function () {
//     const isLoggedIn = localStorage.getItem("userLoggedIn");
//     if (!isLoggedIn) {
//       window.location.href = "LogInPage.html"; // Force login if not authenticated
//     }
//   });
