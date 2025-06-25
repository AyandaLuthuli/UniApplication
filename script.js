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
    {
      name: "BSc Computer Science (UCT)",
      requiredAPS: 40,
      requiredSubjects: { math: 70, english: 50, computers: 60 },
      description: "Advanced programming, algorithms, and data structures.",
      applyLink: "https://www.uct.ac.za",
    },
    {
      name: "BA Journalism (Rhodes)",
      requiredAPS: 34,
      requiredSubjects: { english: 65 },
      description: "News reporting, media ethics, and multimedia storytelling.",
      applyLink: "https://www.ru.ac.za",
    },
    {
      name: "Diploma in Mechanical Engineering (MUT)",
      requiredAPS: 24,
      requiredSubjects: { math: 60, english: 50, physics: 55 },
      description: "Machine design, thermodynamics, and manufacturing.",
      applyLink: "https://www.mut.ac.za",
    },
    {
      name: "BSc Agriculture (UL)",
      requiredAPS: 30,
      requiredSubjects: { math: 50, english: 50, lifeScience: 60 },
      description: "Crop science, agribusiness, and sustainable farming.",
      applyLink: "https://www.ul.ac.za",
    },
    {
      name: "Higher Certificate in Hospitality (IIE)",
      requiredAPS: 18,
      requiredSubjects: { english: 50 },
      description: "Hotel management, food service, and tourism operations.",
      applyLink: "https://www.iie.ac.za",
    },
    {
      name: "BEng Electrical Engineering (Wits)",
      requiredAPS: 42,
      requiredSubjects: { math: 75, english: 50, physics: 70 },
      description: "Power systems, electronics, and telecommunications.",
      applyLink: "https://www.wits.ac.za",
    },
    {
      name: "Diploma in Graphic Design (Inscape)",
      requiredAPS: 20,
      requiredSubjects: { english: 50, arts: 60 },
      description: "Digital design, branding, and visual communication.",
      applyLink: "https://www.inscape.ac",
    },
    {
      name: "BA Social Work (UWC)",
      requiredAPS: 28,
      requiredSubjects: { english: 60, lifeScience: 50 },
      description: "Community development and counseling techniques.",
      applyLink: "https://www.uwc.ac.za",
    },
    {
      name: "BSc Chemistry (UKZN)",
      requiredAPS: 36,
      requiredSubjects: { math: 60, english: 50, physicalScience: 65 },
      description: "Organic, inorganic, and analytical chemistry.",
      applyLink: "https://www.ukzn.ac.za",
    },
    {
      name: "Diploma in Logistics (Damelin)",
      requiredAPS: 22,
      requiredSubjects: { english: 55, math: 50 },
      description: "Supply chain management and transport economics.",
      applyLink: "https://www.damelin.co.za",
    },
    {
      name: "BArch Architecture (UP)",
      requiredAPS: 38,
      requiredSubjects: { math: 60, english: 60, arts: 65 },
      description: "Urban design, sustainable buildings, and CAD modeling.",
      applyLink: "https://www.up.ac.za",
    },
    {
      name: "Higher Certificate in Fitness (Trifocus)",
      requiredAPS: 16,
      requiredSubjects: { english: 50, lifeScience: 50 },
      description: "Personal training, nutrition, and exercise science.",
      applyLink: "https://www.trifocusfitnessacademy.co.za",
    },
    {
      name: "MBChB Medicine (Wits)",
      requiredAPS: 42,
      requiredSubjects: {
        math: 70,
        english: 60,
        lifeScience: 70,
        physicalScience: 70,
      },
      description: "Undergraduate medical degree with clinical training.",
      applyLink: "https://www.wits.ac.za",
    },
    {
      name: "BEng Mechanical Engineering (UCT)",
      requiredAPS: 42,
      requiredSubjects: { math: 75, english: 50, physics: 70 },
      description: "Robotics, thermodynamics, and advanced mechanics.",
      applyLink: "https://www.uct.ac.za",
    },
    {
      name: "BSc Actuarial Science (UP)",
      requiredAPS: 40,
      requiredSubjects: { math: 80, english: 60 },
      description: "Risk assessment, financial modeling, and statistics.",
      applyLink: "https://www.up.ac.za",
    },
    {
      name: "BSc Astrophysics (UKZN)",
      requiredAPS: 38,
      requiredSubjects: { math: 75, english: 50, physicalScience: 70 },
      description: "Celestial mechanics, cosmology, and space science.",
      applyLink: "https://www.ukzn.ac.za",
    },
    {
      name: "LLB Law (Stellenbosch)",
      requiredAPS: 38,
      requiredSubjects: { english: 70, math: 50 },
      description: "Constitutional law, criminal justice, and legal practice.",
      applyLink: "https://www.sun.ac.za",
    },
    {
      name: "BSc Data Science (UJ)",
      requiredAPS: 36,
      requiredSubjects: { math: 70, english: 50, computers: 60 },
      description: "Machine learning, big data analytics, and AI applications.",
      applyLink: "https://www.uj.ac.za",
    },
    {
      name: "BPharm Pharmacy (NWU)",
      requiredAPS: 36,
      requiredSubjects: {
        math: 60,
        english: 60,
        lifeScience: 65,
        physicalScience: 65,
      },
      description: "Pharmaceutical sciences and drug development.",
      applyLink: "https://www.nwu.ac.za",
    },
    {
      name: "BVSc Veterinary Science (UP)",
      requiredAPS: 40,
      requiredSubjects: {
        math: 60,
        english: 60,
        lifeScience: 70,
        physicalScience: 65,
      },
      description: "Animal medicine, surgery, and pathology.",
      applyLink: "https://www.up.ac.za",
    },
    {
      name: "BSc Nuclear Physics (NMMU)",
      requiredAPS: 38,
      requiredSubjects: { math: 75, english: 50, physicalScience: 75 },
      description: "Quantum theory, radiation, and reactor physics.",
      applyLink: "https://www.mandela.ac.za",
    },
    {
      name: "BCom Investment Management (UCT)",
      requiredAPS: 38,
      requiredSubjects: { math: 70, english: 60 },
      description: "Portfolio management, financial derivatives, and trading.",
      applyLink: "https://www.uct.ac.za",
    },
    {
      name: "BSc Marine Biology (UCT)",
      requiredAPS: 36,
      requiredSubjects: { math: 60, english: 50, lifeScience: 65 },
      description: "Marine ecosystems, conservation, and oceanography.",
      applyLink: "https://www.uct.ac.za",
    },
    {
      name: "BSc Geology (Wits)",
      requiredAPS: 36,
      requiredSubjects: { math: 60, english: 50, physicalScience: 65 },
      description: "Earth sciences, mineralogy, and geophysics.",
      applyLink: "https://www.wits.ac.za",
    },
    {
      name: "BCom Accounting (UJ)",
      requiredAPS: 34,
      requiredSubjects: { math: 60, english: 50 },
      description: "Financial reporting, auditing, and taxation.",
      applyLink: "https://www.uj.ac.za",
    },
    {
      name: "BSc Environmental Science (UKZN)",
      requiredAPS: 34,
      requiredSubjects: { math: 50, english: 50, lifeScience: 60 },
      description: "Ecology, conservation, and environmental policy.",
      applyLink: "https://www.ukzn.ac.za",
    },
    {
      name: "BCom Marketing Management (CPUT)",
      requiredAPS: 32,
      requiredSubjects: { english: 60, math: 50 },
      description: "Consumer behavior, digital marketing, and brand strategy.",
      applyLink: "https://www.cput.ac.za",
    },
    {
      name: "BSc Information Systems (UJ)",
      requiredAPS: 30,
      requiredSubjects: { math: 60, english: 50, computers: 55 },
      description:
        "Database management, software engineering, and IT strategy.",
      applyLink: "https://www.uj.ac.za",
    },
    {
      name: "BSc Biotechnology (UCT)",
      requiredAPS: 36,
      requiredSubjects: { math: 60, english: 50, lifeScience: 65 },
      description: "Genetic engineering, microbiology, and bioinformatics.",
      applyLink: "https://www.uct.ac.za",
    },
    {
      name: "BCom Human Resource Management (NWU)",
      requiredAPS: 30,
      requiredSubjects: { english: 60, math: 50 },
      description: "Talent management, organizational behavior, and labor law.",
      applyLink: "https://www.nwu.ac.za",
    },
    {
      name: "BSc Physics (Wits)",
      requiredAPS: 36,
      requiredSubjects: { math: 70, english: 50, physicalScience: 70 },
      description:
        "Classical mechanics, electromagnetism, and quantum physics.",
      applyLink: "https://www.wits.ac.za",
    },
  ];

  console.log(`Total courses: ${courses.length}`);
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
