import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ========================================
// CẤU HÌNH SMTP - Gmail App Password
// ========================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'support.cuongthonggio@gmail.com',
    pass: process.env.EMAIL_PASS || 'cqij rxuy vmqv anex',
  },
});

// Verify transporter (optional in serverless, but okay for health checks)
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (err) {
    console.error('❌ SMTP connection failed:', err);
    return false;
  }
};

// ========================================
// API: Gửi email liên hệ
// ========================================
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng điền đầy đủ các trường bắt buộc (họ tên, SĐT, yêu cầu).',
      });
    }

    const cleanedPhone = phone.replace(/[\s.-]/g, '');
    if (!/^0\d{9}$/.test(cleanedPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Số điện thoại không hợp lệ.',
      });
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 30px 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: 1px;">📩 YÊU CẦU TƯ VẤN MỚI</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 8px 0 0;">Từ website cuongthonggio.com</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
                <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Họ và tên</span>
                <div style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin-top: 4px;">${name}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
                <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Số điện thoại</span>
                <div style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin-top: 4px;">
                  <a href="tel:${cleanedPhone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </div>
              </td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top;">
                <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email</span>
                <div style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin-top: 4px;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </div>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding: 14px 0; vertical-align: top;">
                <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Yêu cầu kỹ thuật</span>
                <div style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin-top: 8px; background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1a1a1a;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div style="background: #f8f9fa; padding: 20px 32px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Email này được gửi tự động từ form liên hệ trên website cuongthonggio.com</p>
          <p style="color: #bbb; font-size: 11px; margin: 6px 0 0;">${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Cuong Thong Gio" <${process.env.EMAIL_USER || 'support.cuongthonggio@gmail.com'}>`,
      to: 'phantrongkien12@gmail.com',
      replyTo: email || undefined,
      subject: `Yeu cau tu van - ${name} - ${phone}`,
      text: `Họ tên: ${name}\nSĐT: ${phone}\nEmail: ${email || 'N/A'}\nYêu cầu: ${message}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    if (email) {
      await transporter.sendMail({
        from: `"Cuong Thong Gio" <${process.env.EMAIL_USER || 'support.cuongthonggio@gmail.com'}>`,
        to: email,
        subject: 'Cuong Thong Gio - Đã nhận yêu cầu tư vấn của bạn',
        html: `<p>Xin chào ${name},</p><p>Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm nhất.</p>`,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'production' && process.env.GATEWAY !== 'netlify') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export const handler = serverless(app);
export default app;
