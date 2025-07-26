# 🌍 Country Info API (NestJS)

This is a RESTful API built with NestJS that allows users to fetch country details, manage national holidays, and store selected holidays in their personal calendar.

---

## 🛠️ Prerequisites

This project requires a **MySQL** database.

Update your `.env` file with the correct database credentials:

```env
DATABASE_URL="mysql://<login>:<password>@localhost:3306/CountryInfo"
```

Replace `<login>` and `<password>` with your MySQL username and password.

Also correct host if needed

Make sure the `CountryInfo` database exists. If not, create it manually:

```sql
CREATE DATABASE CountryInfo;
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:DavidBakalov21/Country-Info-App.git
cd Country-Info-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run

```bash
npm run start:dev
```

### 4. Test

Use Postman to test it
