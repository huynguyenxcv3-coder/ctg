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
// Microsoft Graph API - OAuth2 Client Credentials
// Bypass Security Defaults, no SMTP needed
// ========================================
const GRAPH_CONFIG = {
  tenantId: process.env.AZURE_TENANT_ID,
  clientId: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  fromEmail: process.env.EMAIL_USER || 'admin@example.com',
};

// Cache access token
let tokenCache = { token: null, expiresAt: 0 };

async function getAccessToken() {
  // Return cached token if still valid (with 5 min buffer)
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 300000) {
    return tokenCache.token;
  }

  const tokenUrl = `https://login.microsoftonline.com/${GRAPH_CONFIG.tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: GRAPH_CONFIG.clientId,
    client_secret: GRAPH_CONFIG.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Token error: ${err.error_description || err.error || response.statusText}`);
  }

  const data = await response.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

async function sendMailViaGraph({ to, subject, htmlBody, textBody, replyTo }) {
  const token = await getAccessToken();

  // Support multiple emails separated by commas
  const toList = to.split(',').map(email => ({ emailAddress: { address: email.trim() } }));

  const message = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlBody,
      },
      toRecipients: toList,
    },
    saveToSentItems: true,
  };

  // Add replyTo if provided
  if (replyTo) {
    message.message.replyTo = [{ emailAddress: { address: replyTo } }];
  }

  const graphUrl = `https://graph.microsoft.com/v1.0/users/${GRAPH_CONFIG.fromEmail}/sendMail`;

  const response = await fetch(graphUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Graph API error (${response.status}): ${err}`);
  }

  return true;
}

// Verify Graph API connection
const verifyGraphAPI = async () => {
  try {
    if (!GRAPH_CONFIG.tenantId || !GRAPH_CONFIG.clientId || !GRAPH_CONFIG.clientSecret) {
      console.warn('⚠️  Azure credentials not set. Set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET');
      return false;
    }
    const token = await getAccessToken();
    console.log('✅ Microsoft Graph API connected (token obtained)');
    return !!token;
  } catch (err) {
    console.error('❌ Graph API connection failed:', err.message);
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

    // Send notification to admin via Graph API
    await sendMailViaGraph({
      to: process.env.EMAIL_TO || 'admin@example.com',
      subject: `Yeu cau tu van - ${name} - ${phone}`,
      htmlBody: htmlContent,
      textBody: `Họ tên: ${name}\nSĐT: ${phone}\nEmail: ${email || 'N/A'}\nYêu cầu: ${message}`,
      replyTo: email || undefined,
    });

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

      await sendMailViaGraph({
        to: email,
        subject: 'Cuong Thong Gio - Đã nhận yêu cầu tư vấn của bạn',
        htmlBody: customerHtml,
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
    await verifyGraphAPI();
  });
}

export const handler = serverless(app);
export default app;
