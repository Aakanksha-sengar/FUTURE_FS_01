# 🌐 FUTURE_FS_01 — Personal Portfolio Website

> **Future Interns | Full Stack Web Development Track**
> **Intern:** Aakanksha Singh Sengar | **CIN:** FIT/MAR26/FS13123

## 🔗 Live Demo
**[👉 View Portfolio](https://aakanksha-sengar.github.io/FUTURE_FS_01)**

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Email | Nodemailer (Gmail) |
| Hosting | Render (backend) + GitHub Pages (frontend) |

## 📂 Project Structure
```
FUTURE_FS_01/
├── public/
│   └── index.html       ← Frontend (all CSS + JS inline)
├── server.js            ← Node.js + Express backend
├── package.json         ← Dependencies
├── .env.example         ← Environment variables template
├── .gitignore           ← Ignores node_modules & .env
└── README.md
```

## 🚀 Run Locally
```bash
# 1. Clone
git clone https://github.com/Aakanksha-sengar/FUTURE_FS_01.git
cd FUTURE_FS_01

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and Gmail App Password

# 4. Start server
npm start
# Open http://localhost:3000
```

## ⚙️ Backend Setup
### MongoDB Atlas (Free)
1. Go to https://cloud.mongodb.com
2. Create free cluster → Connect → Drivers → Copy URI
3. Paste in `.env` as `MONGO_URI`

### Gmail App Password
1. Google Account → Security → 2-Step Verification → App Passwords
2. Generate for "Mail" → Copy 16-char password
3. Paste in `.env` as `EMAIL_PASS`

## 🌍 Deploy to Render (Free)
1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo
4. Add environment variables from `.env`
5. Deploy!

## ✅ Features
- Dark Cyan professional theme
- Responsive (mobile + desktop)
- Hero with real photo
- About + Education timeline
- 14+ Certificates section
- 6 real projects with GitHub links
- Hackathons & events section
- Contact form → saves to MongoDB + sends email to Gmail
- SEO meta tags

## 👩‍💻 Developer
**Aakanksha Singh Sengar**
- 🎓 B.Tech CSE — GWEC Ajmer (2nd Year, Sem 4)
- 🏅 91% in 12th Boards (2024)
- 💼 Future Interns + MSME Intern
- 🏆 7+ Hackathons incl. AceHack 5.0 (36hrs)
- 📍 Udaipur, Rajasthan

**Connect:** [LinkedIn](https://www.linkedin.com/in/aakanksha-singh-sengar-b254a1338) | [GitHub](https://github.com/Aakanksha-sengar) | aakankshasengar10@gmail.com

---
*© 2026 Aakanksha Singh Sengar · Future Interns Task 1*
