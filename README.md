
├── src/
│   ├── pages/           # All pages
│   │   ├── Homepage.jsx
│   │   ├── LoginPage.jsx, SignupPage.jsx
│   │   ├── Profile.jsx, EditProfile.jsx
│   │   ├── AllCourses.jsx
│   │   └── Educator/     # Educator-specific pages
│   │       ├── Dashboard.jsx
│   │       ├── Courses.jsx
│   │       ├── Createcourse.jsx
│   │       └── Editcourse.jsx
│   │
│   ├── component/       # Reusable components
│   │   ├── Nav.jsx
│   │   ├── Card.jsx, ShowCard.jsx
│   │   ├── ExploreCourses.jsx
│   │   └── LogoforHomePage.jsx
│   │
│   ├── redux/           # State management
│   │   ├── store.js
│   │   ├── userSlice.js           # User data
│   │   ├── educatorSlice.js       # Educator courses
│   │   └── allCourseSlice.js      # All courses
│   │
│   ├── customHooks/     # Custom React hooks
│   │   ├── getCurrentUser.js
│   │   ├── getAllCourses.js
│   │   ├── getEducatorCourse.js
│   │   ├── getThumnail.js
│   │   └── useCloudinaryUpload.js
│   │
│   ├── assets/          # Images, icons
│   └── App.jsx          # Main routing
│
├── utils/
│   └── firebase.js      # Firebase config
│
└── package.json


---

## 🧰 Technologies Used

| Package | Purpose |
|----------|----------|
| **Tailwind CSS** | For modern and responsive UI design |
| **React Redux** | To manage global app state |
| **@reduxjs/toolkit** | Simplifies Redux setup and logic |
| **React Router DOM** | For page navigation and routing |
| **React Toastify** | For clean and attractive notifications |
| **React Spinners** | To show loading indicators |
| **Axios** | For API calls and HTTP requests |

---

## ⚙️ Features (Day 1)

✅ **User Authentication**
- Signup new users  
- Login existing users  
- Manage user data in Redux  
- Handle API requests with Axios  
- Show notifications (success/error) via React Toastify  
- Display loading states using React Spinners  

---


# 🚀 React Authentication App (Day 1)

A modern React application built with **TailwindCSS**, **Redux Toolkit**, and **React Router**, featuring **Login** and **Signup** functionality.

---

## 📁 Project Structure


