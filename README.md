# 📚 Book Club Library Management

A modern library management system frontend built for libraries in Sri Lanka. Manage books, readers, lending, and overdue tracking with ease.

## ✨ Features

- 🔐 **Authentication** - Secure staff login
- 👤 **Reader Management** - Complete CRUD operations
- 📚 **Book Management** - Catalog management
- 📖 **Lending System** - Track lending & returns
- ⏰ **Overdue Tracking** - Monitor overdue books
- ✉️ **Email Notifications** - Automated reminders
- 🔍 **Search & Filter** - Quick data access
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Authentication:** JWT
- **Backend:** Node.js, MongoDB
- **Email:** SendGrid/Nodemailer

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/lakmal-yapa-22/book-club-library-management-fontend.git
cd bookclub-frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to access the application.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── services/      # API integration
├── context/       # State management
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## 📸 Screenshots

| Feature | Preview |
|---------|---------|
| Login | ![Login](images/login.png) |
| Dashboard | ![Dashboard](images/dashboard.png) |
| Reader Management | ![Readers](images/reader.png) |
| Book Catalog | ![Books](images/book.png) |
| Issue Books | ![Issue](images/issuebook.png) |

## 🔧 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Code linting
```

## 📋 Development Status

- ✅ Core functionality complete
- ✅ Authentication system
- ✅ CRUD operations
- ✅ Responsive design
- 🔄 Testing & optimization
- 📅 Deployment preparation

## 🚀 Deployment

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 👨‍💻 Author

**Lakmal Kumarasiri Yapa**  
Software Engineering Student @ IJSE  
📍 Monaragala, Sri Lanka

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/lakmal-yapa-22)



---

⭐ **Star this repo if you found it helpful!**
