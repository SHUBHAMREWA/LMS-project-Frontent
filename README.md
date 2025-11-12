# Vihaan LMS – Full-Stack Project Documentation

A full-stack Learning Management System (LMS) with modern React frontend and Node.js/Express backend. This README gives a clear overview of features, tech stack, folder structure, API routes, environment setup, and how to run the project locally.

Note: Frontend + Backend dono ka end-to-end flow niche clearly explain kiya gaya hai. AI search, OTP, Google login, Cloudinary uploads aur Razorpay payments sab cover hai.

---

## 1) Project Structure

```
LMSProject/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   ├── connectDB.js            # MongoDB connection
│   │   ├── cloudinary.js           # Cloudinary v2 config
│   │   ├── mailSetup.js            # Nodemailer + OTP template
│   │   ├── EmailFormates.js        # OTP HTML template
│   │   └── rezorPayinstance.js     # Razorpay instance
│   ├── middleware/
│   │   ├── isAuth.js               # JWT cookie auth guard
│   │   ├── multer.js               # File upload (disk storage)
│   │   └── token.js                # JWT sign helper
│   ├── model/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Thumbnail.js
│   │   ├── CourseModule.js
│   │   ├── LessonModule.js
│   │   ├── Enrollment.js
│   │   ├── Payments.js
│   │   └── Reviews.js
│   ├── controller/
│   │   ├── authController.js       # signup/login/otp/google/forgot
│   │   ├── CourseController.js     # course CRUD, modules, lessons, reviews
│   │   ├── enrollmentController.js # Razorpay order + verify + enroll
│   │   ├── getCurrentUser.js
│   │   └── searchWithai.js         # Google GenAI powered search
│   └── routes/
│       ├── authRoute.js
│       ├── courseRoute.js
│       ├── enrollRoute.js
│       └── getUserRoute.js
│
├── frontent/
│   ├── package.json
│   ├── vite.config.js              # dev proxy to backend
│   ├── tailwind.config.js
│   ├── utils/firebase.js           # Firebase Auth (Google Sign-In)
│   └── src/
│       ├── App.jsx                 # Routes + auth bootstrap
│       ├── assets/
│       ├── component/              # Nav, Cards, Footer, etc.
│       ├── customHooks/            # API/data hooks (axios)
│       │   ├── getCurrentUser.js
│       │   ├── getAllCourses.js
│       │   ├── getEducatorCourse.js
│       │   ├── getEnrollCourses.js
│       │   └── useCloudinaryUpload.js
│       ├── pages/
│       │   ├── Homepage.jsx, AllCourses.jsx, Search.jsx
│       │   ├── LoginPage.jsx, SignupPage.jsx, ForgotPassword.jsx
│       │   ├── Profile.jsx, EditProfile.jsx
│       │   ├── Educator/ (Dashboard, Courses, Create/Edit, Modules)
│       │   └── student/ (StudentCourse, WatchCourse)
│       └── redux/
│           ├── store.js
│           ├── userSlice.js
│           ├── educatorSlice.js
│           ├── allCourseSlice.js
│           └── enrollCourseSlice.js
│
└── README.md (this file)
```

---

## 2) Tech Stack and Libraries

Backend (Node.js + Express)
- express 5, cors, cookie-parser
- mongodb + mongoose (ODM)
- jsonwebtoken (JWT) with httpOnly cookie auth
- bcryptjs (password hashing)
- dotenv (env management)
- nodemailer (SMTP over Gmail)
- cloudinary (media hosting)
- multer (file upload for profile pic)
- razorpay (payments + enrollment)
- @google/genai (Gemini for AI-powered search)

Frontend (React + Vite)
- react 19, react-router-dom 7
- @reduxjs/toolkit, react-redux (state management)
- axios (API calls)
- tailwindcss 4, autoprefixer (styling)
- react-toastify, react-spinners (UX)
- recharts (charts in educator dashboard)
- react-icons (icons)
- firebase (Google Sign-In via Firebase Auth)
- browser-image-compression (client-side image optimization)

Dev/Build
- vite 7, @vitejs/plugin-react
- eslint 9

---

## 3) Key Features

User Accounts and Authentication
- Signup/Login with strong password validation (validator)
- JWT in httpOnly cookie, secure + sameSite: "none"
- Google Sign-In via Firebase Auth
- OTP email flow via Nodemailer (Gmail SMTP)
- Forgot Password with OTP verification
- Profile update with Cloudinary image upload

Course Management (Educator)
- Create/Edit/Delete courses
- Thumbnails and demo video link (Cloudinary image gallery + YouTube/Vimeo embed)
- Modules and Lessons: add, list, delete; lesson video by link
- Published/draft status, categories
- Educator dashboard: charts for lessons count and enrollments (recharts)

Discovery and Learning (Student/Public)
- Public course list and details
- AI-powered course search (Google GenAI → keyword extraction → Mongo query)
- Enrollment and Payment via Razorpay
- Student “My Courses” and watch page with lessons player
- Reviews: add rating/comment after enrollment

Infrastructure/UX
- Global state with Redux Toolkit
- TailwindCSS responsive UI
- Vite dev server with proxy to backend

---

## 4) API Overview (Backend)

Auth: /api/user
- POST /signup
- POST /login
- GET  /logout
- POST /sent-otp
- POST /verify-otp
- POST /forgot-password
- POST /google-auth
- POST /profile-update (multipart, field photoUrl)

User: /user
- GET  /getuser (current user; JWT cookie required)

Course: /api/course
- POST   /add-course
- POST   /add-thumbnail
- POST   /cloudinary/delete (body: publicId)
- POST   /edit-course
- DELETE /delete-course/:courseId
- GET    /creater-course (educator’s own)
- GET    /getcourse-by-id/:couresId
- GET    /getAllcourse (published only)
- GET    /published-by-educator/:educatorId
- GET    /modules-with-lessons/:courseId (public)
- GET    /get-modules/:courseId (auth)
- GET    /get-lessons/:moduleId (auth)
- DELETE /module-delete/:moduleId (auth)
- DELETE /lesson-delete/:lessonId (auth)
- POST   /add-review (auth)
- POST   /search-with-ai?query=... (AI search)

Enrollment/Payment: /api/enroll
- POST /generate-order/:courseId (auth)
- POST /verify-payment (auth) → creates Payment + Enrollment

---

## 5) Data Models (Mongoose)

- User: name, email, password, role (student|educator), phone, photoUrl, provider
- Course: educatorId, title, subTitle, description, mrp, price, category, isPublished
- Thumbnail: courseId, images[], demoLink
- CourseModule: courseId, name, number
- Lesson: moduleId, name, lessonDetails, number, videoUrl
- Enrollment: userId, courseId, paymentId, validTill (2 years)
- Payment: courseId, amount
- Review: studentId, courseId, rating, comment

---

## 6) Environment Variables

Backend (.env in backend/)
- PORT=5001
- MONGODB_URI=mongodb+srv://...
- JWT_SECRET=your_jwt_secret
- EMAIL_USER=your_gmail_address
- EMAIL_PASS=your_gmail_app_password
- CLOUDINARY_CLOUD_NAME=...
- CLOUDINARY_API_KEY=...
- CLOUDINARY_API_SECRET=...
- KEY_ID=razorpay_key_id
- KEY_SECRET=razorpay_key_secret
- GEMINI_API_KEY=google_genai_api_key

Frontend (.env in frontent/)
- VITE_API_URL=http://localhost:5001
- VITE_FIREBASE_API_KEY=...
- VITE_CLOUDINARY_CLOUD_NAME=...
- VITE_CLOUDINARY_UPLOAD_PRESET=unsigned_or_signed_preset
- VITE_CLOUDINARY_FOLDER=LMS_MEDIA (optional)

Note:
- Vite env vars must start with VITE_.
- Firebase config is in frontent/utils/firebase.js.

---

## 7) Local Development

1) Install dependencies
- Backend: cd backend && npm install
- Frontend: cd frontent && npm install

2) Start services
- Backend: npm run start (or npm run dev) inside backend/
- Frontend: npm run dev inside frontent/ (Vite runs with proxy to 5001)

3) Open frontend
- Vite dev server URL printed in terminal (typically http://localhost:5173)

---

## 8) Important Implementation Notes

- Auth Cookie
  - Name: Logintoken, httpOnly=true, sameSite="none", secure=true
  - Ensure you access the site via HTTPS in production for secure cookies.
- CORS
  - Allowed dev origins include http://localhost:5173 and a deployed domain.
- Media Uploads
  - Client compresses images (browser-image-compression), uploads to Cloudinary with unsigned preset.
  - Backend can remove Cloudinary images via publicId.
- Video Links
  - Lessons/demo accept YouTube/Vimeo links; frontend converts to embed URL safely.
- AI Search
  - searchWithai uses Google GenAI to turn free text → course keywords → Mongo regex search.
- Payments
  - Razorpay order is created server-side; verify endpoint creates Payment + Enrollment.

---

## 9) Scripts

Backend (backend/package.json)
- npm run dev → node server.js
- npm run start → node server.js

Frontend (frontent/package.json)
- npm run dev       → vite --host 0.0.0.0
- npm run build     → vite build
- npm run preview   → vite preview
- npm run lint      → eslint .

---

## 10) Future Enhancements (Suggestions)
- Role-based authorization middleware for educator-only routes on server.
- Signed Cloudinary uploads for tighter control.
- Webhook verification for Razorpay payments.
- Pagination and caching for course lists.
- E2E tests and CI for key flows (auth, create course, enroll, watch).

---

## 11) Credits
Built with love for learning. Frontend + backend clearly separated for scalability. Good luck and happy shipping!
