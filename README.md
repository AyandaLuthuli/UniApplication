SA University Course Finder
A web application that helps South African students find university courses based on their matric results.

📌 Overview
This project is a University Course Eligibility Checker designed for South African high school students. It calculates a student's Admission Point Score (APS) based on their matric marks and matches them with eligible university courses around south african unis.

🔗 Live Demo : https://ayandaluthuli.github.io/UniApplication/

 Features
✅ APS Calculator – Automatically computes your Admission Point Score
✅ Course Matching – Finds eligible courses based on your marks
✅ University Listings – Displays courses from top SA universities (UCT, Wits, UP, etc.)
✅ Responsive Design – Works on desktop, tablet, and mobile
✅ Supabase Backend – Stores course data securely


 How It Works
 
1.User Input
-Students enter their matric marks (e.g., Math, English, Physics).

2.APS Calculation
-The system converts marks to APS points (1-7 scale).

3.Course Matching
-Queries Supabase for courses where:
-required_aps <= user_aps
-Subject marks meet minimum requirements

4.Display Result
-Shows eligible courses with:
-University name
-APS requirement
-Application link



💡 Future Improvements
-User accounts (save progress)
-NSFAS/Bursary eligibility checker
- path suggestions
-Mobile app version
