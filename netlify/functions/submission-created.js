exports.handler = async (event) => {
  const payload = JSON.parse(event.body).payload;
  const { name, email, paket, nachricht } = payload.data;

  if (!email) return { statusCode: 200, body: 'No email' };

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ODGX Podcast <onboarding@resend.dev>',
      to: email,
      reply_to: 'info@online-digitalx.de',
      subject: 'Ihre Anfrage bei ODGX – wir melden uns!',
      html: `
        <p>Hallo ${name},</p>
        <p>vielen Dank für Ihre Anfrage. Wir haben folgende Angaben erhalten:</p>
        <ul>
          <li><strong>Paket:</strong> ${paket || '–'}</li>
          <li><strong>Nachricht:</strong> ${nachricht || '–'}</li>
        </ul>
        <p>Wir melden uns in der Regel innerhalb eines Werktages.</p>
        <p>Beste Grüße<br>Das ODGX Team<br>online-digitalx.de</p>
      `,
    }),
  });

  return { statusCode: 200, body: 'OK' };
};
