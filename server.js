const express    = require('express');
const mongoose   = require('mongoose');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ── MongoDB Connection ─────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ── Message Schema ─────────────────────────────────────────
const messageSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  subject:   { type: String, default: 'General' },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// ── Nodemailer Setup ───────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // aakankshasengar10@gmail.com
    pass: process.env.EMAIL_PASS    // Gmail App Password (16 characters)
  }
});

// ── Contact API ────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    // 1. Save to MongoDB
    const newMsg = new Message({ name, email, subject, message });
    await newMsg.save();
    console.log('💾 Message saved to DB:', name, email);

    // 2. Send email notification to Aakanksha
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      subject: `📬 New Message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#00d4aa;margin-bottom:4px;">New Portfolio Message</h2>
          <p style="color:#666;font-size:13px;margin-bottom:20px;">Someone contacted you through your portfolio!</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:80px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00d4aa;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px;">Topic</td><td style="padding:8px 0;">${subject || 'General'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border-left:3px solid #00d4aa;">
            <p style="margin:0;font-size:14px;line-height:1.6;">${message}</p>
          </div>
          <p style="margin-top:20px;font-size:12px;color:#aaa;text-align:center;">Sent from Aakanksha Singh Sengar's Portfolio</p>
        </div>
      `
    });
    console.log('📧 Email sent successfully!');

    // 3. Send confirmation email to sender
    await transporter.sendMail({
      from:    `"Aakanksha Singh Sengar" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}! 👋`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#060d1a;color:#e8f4f1;border-radius:8px;">
          <h2 style="color:#00d4aa;">Hey ${name.split(' ')[0]}! 👋</h2>
          <p style="color:#8a96a8;line-height:1.7;">Thanks for reaching out through my portfolio! I've received your message and will get back to you within <strong style="color:#e8f4f1;">24 hours</strong>.</p>
          <p style="color:#8a96a8;line-height:1.7;">In the meantime, feel free to connect with me on LinkedIn or check out my GitHub projects!</p>
          <div style="margin-top:20px;display:flex;gap:10px;">
            <a href="https://www.linkedin.com/in/aakanksha-singh-sengar-b254a1338" style="color:#00d4aa;">LinkedIn</a> &nbsp;|&nbsp;
            <a href="https://github.com/Aakanksha-sengar" style="color:#00d4aa;">GitHub</a>
          </div>
          <p style="margin-top:24px;color:#6b8f8a;font-size:12px;">— Aakanksha Singh Sengar<br/>CSE Student · GWEC Ajmer · Full Stack Developer</p>
        </div>
      `
    });
    console.log('📧 Confirmation sent to:', email);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ── Serve frontend ─────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start Server ───────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
