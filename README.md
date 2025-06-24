# 🎟️ Event Booking System

A modern event booking platform that allows customers to view and book events while enabling organizers to create and manage their own events.

## 🚀 Features

- ✅ Customers can view and book available events
- ✅ Organizers can create their own events
- ✅ Events display with images (Cloudinary integration)
- ✅ Protected routes based on user type (Customer/Organizer)
- ✅ Modern responsive UI using Tailwind CSS

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Media Upload | Cloudinary API |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Git
- Node.js (with npm)
- PostgreSQL

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/praveengurana/event-booking-system.git
cd event-booking-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Ensure your PostgreSQL server is running
2. Create a new database named `event`:
3. Restore the Database:
   `right-click on the database event and click resore select the eventdatabase.sql file in the project and click restore.`
4. In server.cjs file make sure you fill the dtabase connection details:
   `DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_pg_user
   DB_PASSWORD=your_pg_password
   DB_NAME=event`

### 4. Environment Configuration


1. Update the `.env` file with your configuration:
   ```env
   JWT_SECRET=JWT_SECRET
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

### 5. Running the Application

Start the backend server:
```bash
node server.cjs
```

In a separate terminal, start the frontend development server:
```bash
npm run dev
```


## 🗂️ Project Structure

```
event-booking-system/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── BookingPage.jsx
│   ├── CustomerHome.jsx
│   ├── LandingPage.jsx
│   ├── LoginForm.jsx
│   ├── SignupForm.jsx
│   ├── Navbar.jsx
│   ├── MyEvents.jsx
│   ├── YourEvents.jsx
│   ├── Organiser.jsx
│   ├── ProtectedRoutes.jsx
│   ├── assets/
│   └── middlewares/
│       └── uploadMiddleware.js
├── server.cjs
├── package.json
├── .env.example
├── .gitignore
├── schema.sql
├── vite.config.js
├── LICENSE
└── README.md
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
