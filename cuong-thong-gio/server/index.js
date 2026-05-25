import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

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
    user: 'support.cuongthonggio@gmail.com',
    pass: 'cqij rxuy vmqv anex',
  },
});

// Verify transporter on startup
transporter.verify()
  .then(() => console.log('✅ SMTP connection verified successfully'))
  .catch((err) => console.error('❌ SMTP connection failed:', err));

// ========================================
// API: Gửi email liên hệ
// ========================================
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng điền đầy đủ các trường bắt buộc (họ tên, SĐT, yêu cầu).',
      });
    }

    // Validate phone (VN format)
    const cleanedPhone = phone.replace(/[\s.-]/g, '');
    if (!/^0\d{9}$/.test(cleanedPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Số điện thoại không hợp lệ.',
      });
    }

    // Build email content
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 30px 32px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: 1px;">
            📩 YÊU CẦU TƯ VẤN MỚI
          </h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 8px 0 0;">
            Từ website cuongthonggio.com
          </p>
        </div>

        <!-- Body -->
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

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 32px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            Email này được gửi tự động từ form liên hệ trên website cuongthonggio.com
          </p>
          <p style="color: #bbb; font-size: 11px; margin: 6px 0 0;">
            ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
          </p>
        </div>
      </div>
    `;

    // Plain text version (quan trọng để tránh spam)
    const textContent = `
YÊU CẦU TƯ VẤN MỚI - cuongthonggio.com
========================================

Họ và tên: ${name}
Số điện thoại: ${phone}${email ? `\nEmail: ${email}` : ''}

Yêu cầu kỹ thuật:
${message}

----------------------------------------
Email gửi tự động từ form liên hệ website cuongthonggio.com
${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
    `.trim();

    // Send email
    const mailOptions = {
      from: `"Cuong Thong Gio" <support.cuongthonggio@gmail.com>`,
      to: 'phantrongkien12@gmail.com',
      replyTo: email || undefined,
      subject: `Yeu cau tu van - ${name} - ${phone}`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'CuongThongGio Website',
      },
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to customer if they provided email
    if (email) {
      const autoReplyHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); padding: 30px 32px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">
              Cường Thông Gió
            </h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 8px 0 0;">
              Giải pháp thông gió chuyên nghiệp
            </p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px;">
              Xin chào ${name},
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              Cảm ơn bạn đã liên hệ với Cường Thông Gió. Chúng tôi đã nhận được yêu cầu tư vấn của bạn và sẽ phản hồi trong thời gian sớm nhất (thường trong vòng 1-2 giờ trong giờ làm việc).
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              Nếu cần hỗ trợ gấp, vui lòng gọi trực tiếp hotline: <a href="tel:0905001224" style="color: #2563eb; text-decoration: none; font-weight: 600;">0905 001 224</a>
            </p>
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1a1a1a;">
              <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin: 0 0 8px;">Nội dung yêu cầu của bạn:</p>
              <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px 32px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 13px; margin: 0; font-weight: 600;">Cường Thông Gió</p>
            <p style="color: #aaa; font-size: 12px; margin: 4px 0 0;">101 Trần Quý Khoách, Hoà Minh, Liên Chiểu, Đà Nẵng</p>
            <p style="color: #aaa; font-size: 12px; margin: 4px 0 0;">Hotline: 0905 001 224</p>
          </div>
        </div>
      `;

      const autoReplyText = `
Xin chao ${name},

Cam on ban da lien he voi Cuong Thong Gio. Chung toi da nhan duoc yeu cau tu van cua ban va se phan hoi trong thoi gian som nhat (thuong trong vong 1-2 gio trong gio lam viec).

Neu can ho tro gap, vui long goi truc tiep hotline: 0905 001 224

Noi dung yeu cau cua ban:
${message}

---
Cuong Thong Gio
101 Tran Quy Khoach, Hoa Minh, Lien Chieu, Da Nang
Hotline: 0905 001 224
      `.trim();

      await transporter.sendMail({
        from: `"Cuong Thong Gio" <support.cuongthonggio@gmail.com>`,
        to: email,
        subject: 'Cuong Thong Gio - Da nhan yeu cau tu van cua ban',
        text: autoReplyText,
        html: autoReplyHtml,
      });
    }

    console.log(`✅ Email sent: ${name} - ${phone}`);
    res.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('❌ Send email error:', error);
    res.status(500).json({
      success: false,
      error: 'Không thể gửi email. Vui lòng thử lại sau.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Email API server running on port ${PORT}`);
});
