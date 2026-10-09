# IITGN Academic Tracker

Academic tracking system for IIT Gandhinagar students.

## Features
- 🔐 JWT Authentication
- 📚 Course management with grades
- 📊 CPI calculator (10-point scale)
- 🎯 Basket tracking for degree requirements
- 📅 Semester planner with credit limits
- 📎 Excel export
- 🏆 Honours & Minor tracking
- 📋 Bulk import from IMS portal
- 🔍 Course search with autocomplete
- 📱 Fully responsive design

## Tech Stack
- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React, Vite, Tailwind CSS, Recharts

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Backend + Frontend Setup
```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
# IITGN Academic Tracker - Update
Backup Data :
npx supabase db dump --db-url 'postgresql://postgres:[YOUR-PASSWORD]@db.hterlbpembhbyyffdith.supabase.co:5432/postgres' -f roles.sql --role-only
npx supabase db dump --db-url 'postgresql://postgres:[YOUR-PASSWORD]@db.hterlbpembhbyyffdith.supabase.co:5432/postgres' -f schema.sql
npx supabase db dump --db-url 'postgresql://postgres:[YOUR-PASSWORD]@db.hterlbpembhbyyffdith.supabase.co:5432/postgres' -f data.sql --use-copy --data-only -x "storage.buckets_vectors" -x "storage.vector_indexes"
