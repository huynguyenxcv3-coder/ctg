import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ========================================
// CẤU HÌNH MICROSOFT 365 SMTP
// ========================================
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER || 'admin@example.com',
    pass: process.env.EMAIL_PASS || 'your_password',
  },
});

const verifyTransporter = async () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️  SMTP credentials not set. Set EMAIL_USER and EMAIL_PASS');
      return false;
    }
    await transporter.verify();
    console.log('✅ Microsoft 365 SMTP connection verified');
    return true;
  } catch (err) {
    console.error('❌ SMTP connection failed:', err.message);
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

    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
    const dateString = now.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const currentTime = `${timeString} ${dateString}`;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yêu cầu tư vấn mới</title>
  <!-- Google Fonts for Email Clients -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" type="text/css">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fafafa;
      font-family: 'Inter', Roboto, 'Open Sans', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #fafafa;
      padding: 60px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      overflow: hidden;
    }
    .header {
      padding: 48px 48px 36px 48px;
      border-bottom: 1px solid #f0f0f0;
      text-align: left;
    }
    .brand-container {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
    }
    .brand-logo-text {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.25em;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;
      display: inline-block;
    }
    .category-tag {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      color: #7f7f7f;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .title {
      font-size: 28px;
      font-weight: 400;
      color: #000000;
      margin: 0 0 16px 0;
      line-height: 1.25;
      letter-spacing: -0.03em;
    }
    .meta-time {
      font-size: 11px;
      font-weight: 400;
      color: #7f7f7f;
      font-family: ui-monospace, SFMono-Regular, SF Pro Icons, "Liberation Mono", Menlo, Monaco, Consolas, monospace;
      margin: 0;
    }
    .body {
      padding: 48px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #000000;
      text-transform: uppercase;
      margin-bottom: 32px;
      border-bottom: 1px solid #000000;
      padding-bottom: 8px;
      display: inline-block;
    }
    .spec-table {
      width: 100%;
      margin-bottom: 36px;
    }
    .spec-row td {
      padding: 18px 0;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
    }
    .spec-row:last-child td {
      border-bottom: none;
    }
    .spec-label {
      width: 140px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: #7f7f7f;
      text-transform: uppercase;
    }
    .spec-value {
      font-size: 14px;
      color: #000000;
      line-height: 1.5;
    }
    .spec-value-phone {
      font-size: 14.5px;
      font-weight: 700;
      color: #000000;
    }
    .quote-block {
      border-left: 2px solid #000000;
      padding-left: 20px;
      margin: 4px 0;
      font-size: 14.5px;
      color: #1a1a1a;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .button-container {
      margin-top: 40px;
      text-align: left;
    }
    .btn {
      display: inline-block;
      background-color: #000000;
      color: #ffffff !important;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 16px 36px;
      text-decoration: none;
      border-radius: 0px;
      transition: background-color 0.2s ease;
    }
    .footer {
      max-width: 600px;
      margin: 0 auto;
      text-align: left;
      padding: 32px 48px 0 48px;
      font-size: 11px;
      color: #7f7f7f;
      line-height: 1.7;
    }
    .footer-link {
      color: #000000;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid #000000;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="https://cuongthonggio.com" target="_blank" style="text-decoration: none; display: inline-block; margin-bottom: 24px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: middle;">
                <img src="https://cuongthonggio.com/logo.png" alt="CTG" width="48" height="48" style="display: block; width: 48px; height: 48px; object-fit: contain;" />
              </td>
              <td style="vertical-align: middle; padding-left: 12px;">
                <span class="brand-logo-text">CƯỜNG THÔNG GIÓ.</span>
              </td>
            </tr>
          </table>
        </a>
        <div class="category-tag">Internal Notification</div>
        <h1 class="title">Yêu cầu tư vấn mới</h1>
        <p class="meta-time">Ghi nhận: ${currentTime}</p>
      </div>
      <div class="body">
        <div class="section-title">Thông tin khách hàng</div>
        
        <table class="spec-table" cellpadding="0" cellspacing="0" border="0">
          <tr class="spec-row">
            <td class="spec-label">Khách hàng</td>
            <td class="spec-value"><strong>${name}</strong></td>
          </tr>
          <tr class="spec-row">
            <td class="spec-label">Điện thoại</td>
            <td class="spec-value-phone">${phone}</td>
          </tr>
          <tr class="spec-row">
            <td class="spec-label">Email</td>
            <td class="spec-value">${email || 'N/A'}</td>
          </tr>
          <tr class="spec-row">
            <td class="spec-label">Nội dung yêu cầu</td>
            <td class="spec-value">
              <div class="quote-block">${message.replace(/\n/g, '<br>')}</div>
            </td>
          </tr>
        </table>

        <div class="button-container">
          <a href="tel:${cleanedPhone}" class="btn">Thực hiện cuộc gọi</a>
        </div>
      </div>
    </div>
    <div class="footer">
      Thư mục thông báo tự động từ hệ thống quản lý website <a href="https://cuongthonggio.com" target="_blank" class="footer-link">cuongthonggio.com</a>.<br>
      Vui lòng không phản hồi trực tiếp vào địa chỉ gửi.
    </div>
  </div>
</body>
</html>`;

    // Send notification to admin via SMTP
    const mailOptions = {
      from: `"Cuong Thong Gio" <${process.env.EMAIL_USER || 'admin@example.com'}>`,
      to: process.env.EMAIL_TO || 'admin@example.com',
      replyTo: email || undefined,
      subject: `Yeu cau tu van - ${name} - ${phone}`,
      text: `Họ tên: ${name}\nSĐT: ${phone}\nEmail: ${email || 'N/A'}\nYêu cầu: ${message}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    if (email) {
      const customerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đã nhận yêu cầu của bạn</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fafafa;
      font-family: 'Inter', Roboto, 'Open Sans', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #fafafa;
      padding: 60px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      overflow: hidden;
    }
    .header {
      padding: 48px 48px 36px 48px;
      border-bottom: 1px solid #f0f0f0;
      text-align: left;
    }
    .brand-name {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.25em;
      color: #000000;
      margin: 0 0 32px 0;
      text-transform: uppercase;
    }
    .category-tag {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      color: #7f7f7f;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .title {
      font-size: 28px;
      font-weight: 400;
      color: #000000;
      margin: 0;
      line-height: 1.25;
      letter-spacing: -0.03em;
    }
    .body {
      padding: 48px;
    }
    .salutation {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }
    .message {
      font-size: 14.5px;
      color: #333333;
      line-height: 1.6;
      margin-bottom: 36px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #000000;
      text-transform: uppercase;
      margin-bottom: 24px;
      border-bottom: 1px solid #000000;
      padding-bottom: 8px;
      display: inline-block;
    }
    .request-preview {
      border-left: 2px solid #000000;
      padding-left: 24px;
      padding-top: 4px;
      padding-bottom: 4px;
      margin-bottom: 48px;
    }
    .request-content {
      font-size: 14px;
      color: #444444;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .steps-container {
      width: 100%;
      margin-top: 16px;
    }
    .step-row {
      margin-bottom: 32px;
    }
    .step-row:last-child {
      margin-bottom: 0;
    }
    .step-number-cell {
      width: 48px;
      vertical-align: top;
      font-family: ui-monospace, SFMono-Regular, SF Pro Icons, monospace;
      font-size: 14px;
      font-weight: 700;
      color: #000000;
      letter-spacing: -0.05em;
    }
    .step-content-cell {
      vertical-align: top;
      padding-bottom: 4px;
    }
    .step-heading {
      font-size: 14.5px;
      font-weight: 600;
      color: #000000;
      margin: 0 0 6px 0;
    }
    .step-desc {
      font-size: 13.5px;
      color: #666666;
      line-height: 1.5;
      margin: 0;
    }
    .footer {
      max-width: 600px;
      margin: 0 auto;
      text-align: left;
      padding: 32px 48px 0 48px;
      font-size: 11px;
      color: #7f7f7f;
      line-height: 1.7;
    }
    .footer-container {
      padding: 32px 48px;
      text-align: left;
      font-size: 11px;
      color: #7f7f7f;
      line-height: 1.7;
      border-top: 1px solid #f0f0f0;
    }
    .footer-link {
      color: #000000;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid #000000;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="https://cuongthonggio.com" target="_blank" style="text-decoration: none; display: inline-block; margin-bottom: 24px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: middle;">
                <img src="https://cuongthonggio.com/logo.png" alt="CTG" width="48" height="48" style="display: block; width: 48px; height: 48px; object-fit: contain;" />
              </td>
              <td style="vertical-align: middle; padding-left: 12px;">
                <span class="brand-name">CƯỜNG THÔNG GIÓ.</span>
              </td>
            </tr>
          </table>
        </a>
        <div class="category-tag">Customer Notice</div>
        <h1 class="title">Đã nhận yêu cầu của quý khách</h1>
      </div>
      <div class="body">
        <p class="salutation">Kính chào <strong>${name}</strong>,</p>
        <p class="message">
          Cảm ơn quý khách đã tin cậy và liên hệ với Cường Thông Gió. Yêu cầu tư vấn thiết kế thi công hệ thống xử lý khí của quý khách đã được lưu trữ trong hệ thống và phân phối đến bộ phận kỹ sư giám sát dự án.
        </p>

        <div class="section-title">Yêu cầu đã tiếp nhận</div>
        <div class="request-preview">
          <div class="request-content">${message.replace(/\n/g, '<br>')}</div>
        </div>

        <div class="section-title">Lộ trình làm việc</div>
        
        <table class="steps-container" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="step-number-cell">01 /</td>
            <td class="step-content-cell">
              <div class="step-row">
                <h4 class="step-heading">Khảo sát &amp; Phân tích Công trình</h4>
                <p class="step-desc">Đội ngũ kỹ sư tiến hành đánh giá kết cấu, diện tích, các thông số kỹ thuật tối ưu dòng khí tự nhiên.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="step-number-cell">02 /</td>
            <td class="step-content-cell">
              <div class="step-row">
                <h4 class="step-heading">Tư vấn Giải pháp &amp; Dự toán</h4>
                <p class="step-desc">Chúng tôi sẽ chủ động liên hệ qua điện thoại hoặc gửi báo cáo file mềm phương án thiết kế sơ bộ trong vòng 24 giờ.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td class="step-number-cell">03 /</td>
            <td class="step-content-cell">
              <div class="step-row">
                <h4 class="step-heading">Thuyết minh Phương án tối ưu</h4>
                <p class="step-desc">Bàn giao giải pháp thông gió cấp khí sạch hồi nhiệt (ERV), bản thảo mặt bằng phân phối cửa gió khoa học.</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      
      <div class="footer-container">
        Thư mục phản hồi tự động từ hệ thống quản lý website <a href="https://cuongthonggio.com" target="_blank" class="footer-link">Cường Thông Gió</a>.<br>
        Vui lòng không phản hồi trực tiếp vào địa chỉ gửi này.
      </div>
    </div>
  </div>
</body>
</html>`;

      await transporter.sendMail({
        from: `"Cuong Thong Gio" <${process.env.EMAIL_USER || 'admin@example.com'}>`,
        to: email,
        subject: 'Cuong Thong Gio - Đã nhận yêu cầu tư vấn của bạn',
        html: customerHtml,
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
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await verifyTransporter();
  });
}

export const handler = serverless(app);
export default app;
p;
