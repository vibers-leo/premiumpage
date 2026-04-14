import nodemailer from 'nodemailer'

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// 견적 요청 확인 이메일
export async function sendQuoteConfirmationEmail(data: {
  email: string
  name: string
  quoteId: string
  templateName?: string
}) {
  const { email, name, quoteId, templateName } = data

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>견적 요청 확인</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
          <!-- 헤더 -->
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #a855f7, #ec4899);">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 900;">Premium Page</h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">프리미엄 웹사이트 제작 플랫폼</p>
            </td>
          </tr>
          
          <!-- 본문 -->
          <tr>
            <td style="padding: 40px; color: #ffffff;">
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">안녕하세요, ${name}님!</h2>
              
              <p style="margin: 0 0 20px; color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.6;">
                견적 요청이 성공적으로 접수되었습니다. 빠른 시일 내에 담당자가 연락드리겠습니다.
              </p>
              
              <!-- 견적 정보 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background: rgba(255, 255, 255, 0.05); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">견적 번호</td>
                        <td style="color: #ffffff; font-size: 16px; font-weight: 600; text-align: right;">#${quoteId}</td>
                      </tr>
                      ${templateName ? `
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">선택 템플릿</td>
                        <td style="color: #ffffff; font-size: 16px; font-weight: 600; text-align: right;">${templateName}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">접수 일시</td>
                        <td style="color: #ffffff; font-size: 16px; font-weight: 600; text-align: right;">${new Date().toLocaleString('ko-KR')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- 다음 단계 -->
              <div style="margin: 30px 0; padding: 20px; background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #ffffff; font-size: 18px; font-weight: 600;">📋 다음 단계</h3>
                <ol style="margin: 0; padding-left: 20px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.8;">
                  <li>영업일 기준 24시간 내 담당자 연락</li>
                  <li>프로젝트 상세 상담 및 요구사항 확인</li>
                  <li>맞춤 견적서 제공</li>
                  <li>계약 후 프로젝트 시작</li>
                </ol>
              </div>
              
              <p style="margin: 30px 0 0; color: rgba(255, 255, 255, 0.7); font-size: 14px; line-height: 1.6;">
                문의사항이 있으시면 언제든지 연락주세요.<br>
                이메일: <a href="mailto:vibers.leo@gmail.com" style="color: #a855f7; text-decoration: none;">vibers.leo@gmail.com</a><br>
                전화: <a href="tel:010-4866-5805" style="color: #a855f7; text-decoration: none;">010-4866-5805</a>
              </p>
            </td>
          </tr>
          
          <!-- CTA 버튼 -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/dashboard" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #ec4899); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px;">대시보드 확인하기</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- 푸터 -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 12px;">
                © 2024 Premium Page. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const textContent = `
안녕하세요, ${name}님!

견적 요청이 성공적으로 접수되었습니다.

견적 번호: #${quoteId}
${templateName ? `선택 템플릿: ${templateName}\n` : ''}접수 일시: ${new Date().toLocaleString('ko-KR')}

다음 단계:
1. 영업일 기준 24시간 내 담당자 연락
2. 프로젝트 상세 상담 및 요구사항 확인
3. 맞춤 견적서 제공
4. 계약 후 프로젝트 시작

문의사항이 있으시면 언제든지 연락주세요.
이메일: vibers.leo@gmail.com
전화: 010-4866-5805

감사합니다.
Premium Page 팀
  `

  try {
    await transporter.sendMail({
      from: `"Premium Page" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `[Premium Page] 견적 요청이 접수되었습니다 (#${quoteId})`,
      text: textContent,
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

// 관리자 알림 이메일
export async function sendAdminNotificationEmail(data: {
  quoteId: string
  customerName: string
  customerEmail: string
  templateName?: string
}) {
  const { quoteId, customerName, customerEmail, templateName } = data

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>새로운 견적 요청</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
    <h2 style="color: #a855f7;">🔔 새로운 견적 요청</h2>
    <p>새로운 견적 요청이 접수되었습니다.</p>
    
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; background: #f9f9f9;"><strong>견적 번호:</strong></td>
        <td style="padding: 10px; background: #f9f9f9;">#${quoteId}</td>
      </tr>
      <tr>
        <td style="padding: 10px;"><strong>고객명:</strong></td>
        <td style="padding: 10px;">${customerName}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f9f9f9;"><strong>이메일:</strong></td>
        <td style="padding: 10px; background: #f9f9f9;">${customerEmail}</td>
      </tr>
      ${templateName ? `
      <tr>
        <td style="padding: 10px;"><strong>템플릿:</strong></td>
        <td style="padding: 10px;">${templateName}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 10px; background: #f9f9f9;"><strong>접수 시간:</strong></td>
        <td style="padding: 10px; background: #f9f9f9;">${new Date().toLocaleString('ko-KR')}</td>
      </tr>
    </table>
    
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/admin/quotes/${quoteId}" style="display: inline-block; margin-top: 20px; padding: 12px 30px; background: #a855f7; color: white; text-decoration: none; border-radius: 6px;">견적 확인하기</a>
  </div>
</body>
</html>
  `

  try {
    await transporter.sendMail({
      from: `"Premium Page System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `[Premium Page Admin] 새로운 견적 요청 (#${quoteId})`,
      html: htmlContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Admin notification error:', error)
    return { success: false, error }
  }
}
