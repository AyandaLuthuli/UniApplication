// ===== Supabase Config =====
const SUPABASE_URL = "https://agquvnnrhyypibcezqou.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncXV2bm5yaHl5cGliY2V6cW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzgxMzcsImV4cCI6MjA2MDY1NDEzN30.APSLQknX6VeX2rePzePWk8vhXbVBrCpezNubCHMecIU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== Form Submit =====
document
  .getElementById("marksForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect marks
    const marks = {
      english: parseInt(document.getElementById("english").value) || 0,
      secondLanguage:
        parseInt(document.getElementById("secondLanguage").value) || 0,
      math: parseInt(document.getElementById("math").value) || 0,
      lifeOrientation:
        parseInt(document.getElementById("lifeOrientation").value) || 0,
      physics: parseInt(document.getElementById("physics").value) || 0,
      accounting: parseInt(document.getElementById("accounting").value) || 0,
      history: parseInt(document.getElementById("history").value) || 0,
      geography: parseInt(document.getElementById("geography").value) || 0,
    };

    // Require at least 6 subjects
    const filledSubjects = Object.values(marks).filter((v) => v > 0).length;
    if (filledSubjects < 6) {
      alert("Please enter at least 6 subjects.");
      return;
    }

    // Calculate APS
    const aps = calculateAPS(marks);

    // Fetch courses from Supabase
    const { data: courses, error } = await supabase.from("courses").select("*");
    if (error) {
      console.error("Supabase error:", error);
      alert("Failed to fetch courses.");
      return;
    }

    // Filter eligible courses
    const eligible = checkEligibility(aps, marks, courses);

    // Show results
    displayResults(eligible, aps);
  });

// ===== APS Calculator =====
function calculateAPS(marks) {
  return Object.values(marks)
    .map((m) => Math.min(Math.floor(m / 10), 7))
    .reduce((a, b) => a + b, 0);
}

// ===== Check Eligibility =====
function checkEligibility(aps, marks, courses) {
  return courses.filter((course) => {
    if (aps < course.required_aps) return false;

    const req = course.required_subjects || {};
    for (const [subject, minMark] of Object.entries(req)) {
      if ((marks[subject] || 0) < minMark) return false;
    }
    return true;
  });
}

// ===== Display Results =====
function displayResults(courses, userAPS) {
  const resultsDiv = document.getElementById("results");
  const coursesList = document.getElementById("coursesList");
  coursesList.innerHTML = "";

  if (courses.length === 0) {
    coursesList.innerHTML = `<p>No courses match your results. Try improving your marks.</p>`;
  } else {
    courses.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      card.innerHTML = `
        <h3>${course.name}</h3>
        <div class="aps-display">
          <span class="aps-label">Your APS:</span>
          <span class="aps-score pass">${userAPS}</span>
          <span class="aps-required">Required APS: ${course.required_aps}</span>
        </div>
        <p>${course.description || ""}</p>
        <a href="${
          course.apply_link
        }" target="_blank" class="apply-btn"><i class="fas fa-paper-plane"></i> Apply Now</a>
      `;
      coursesList.appendChild(card);
    });
  }

  resultsDiv.classList.remove("hidden");
}

// ===== Logout =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userLoggedIn");
  window.location.href = "index.html";
});

// =============================
// Theme Toggle
// =============================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeToggle.textContent = "🌞";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    themeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
