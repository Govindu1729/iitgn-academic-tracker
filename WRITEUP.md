# SmartTrack - Academic Credit & Course Planning System

## Technical Decisions

### Tech Stack Choice
- **Frontend:** React + Vite + Tailwind CSS - Chosen for rapid development, excellent developer experience, and responsive design capabilities.
- **Backend:** Node.js + Express - Lightweight, consistent with frontend JavaScript stack, easy to deploy.
- **Database:** MongoDB - Schema flexibility for evolving course structures, seamless integration with Node.js.
- **Authentication:** JWT with refresh tokens - Stateless, scalable, works well with React frontend.

### Architecture Decisions
1. **Separate Frontend/Backend:** Allows independent scaling and deployment.
2. **MVC Pattern:** Clean separation of concerns (routes → controllers → models).
3. **Context API for Auth:** Global state management without third-party libraries.
4. **Lazy Loading:** Pages loaded on-demand for faster initial load.

## Challenges Faced

### 1. **Basket Normalization**
Different departments use inconsistent basket names (e.g., "Dept Core" vs "Discipline Core"). Solved by creating a mapping utility (`basketMapper.js`) that standardizes basket names.

### 2. **Duplicate Handling in Bulk Import**
Users might import the same course twice. Implemented a three-option system: Skip (ignore duplicates), Replace (delete old, add new), Keep Both (add as separate entries).

### 3. **Semester Credit Limits**
IITGN allows up to 28 credits normally and 32 with overload approval (CPI ≥ 7.0). Implemented dynamic limits with visual warnings.

### 4. **Dynamic Course Catalog**
Courses change over time (e.g., EE 313 replaced by EE 341 from 2025-26). Added `applicableBatches` field to handle versioning.

## What I'd Do With More Time

### 1. **Real-time Notifications**
Push notifications for upcoming registration deadlines, grade releases, and academic calendar events.

### 2. **AI-Powered Recommendations**
- Suggest courses based on remaining baskets and past performance.
- Predict optimal semester loads based on historical CPI trends.

### 3. **Collaborative Features**
- Study group formation based on course schedules.
- Peer mentoring matching.

### 4. **Analytics Dashboard**
- Visual grade distribution across semesters.
- Comparative analysis with department averages.

### 5. **Mobile App**
- React Native or Flutter for native mobile experience.
- Offline support for course catalog access.

### 6. **Integration with IITGN Portal**
- Automatic grade sync via official API.
- Real-time timetable integration.

## Deployment URLs
- **Frontend:** https://iitgn-academic-tracker.vercel.app
- **Backend:** https://your-backend-url.onrender.com
- **GitHub:** https://github.com/Govindu1729/iitgn-academic-tracker

## Demo Video
[Link to demo video](https://youtu.be/your-video-link)
