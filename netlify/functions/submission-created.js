export default async (req) => {
  // Netlify passes a Request object to ESM functions (body is a stream, not a string)
  const { payload } = await req.json();
  const { name, email, paket, message } = payload.data;

  if (!email) return new Response('No email', { status: 200 });

  const resend = (body) => fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const res = await resend({
    from: 'ODGX Podcast <noreply@digital-x.agency>',
    to: email,
    reply_to: 'info@online-digitalx.de',
    subject: 'Ihre Anfrage bei Digital X',
    html: `
      <p>Hallo ${name},</p>
      <p>vielen Dank für Ihre Anfrage. Wir haben folgende Angaben erhalten:</p>
      <ul>
        <li><strong>Paket:</strong> ${paket || '–'}</li>
        <li><strong>Nachricht:</strong><br>${message || '–'}</li>
      </ul>
      <p>Wir melden uns in der Regel innerhalb eines Werktages.</p>
      <p>Beste Grüße<br>Das Digital X Team<br>digital-x.agency</p>
    `,
  });

  if (!res.ok) console.error('Resend error', res.status, await res.text());

  return new Response('OK', { status: 200 });
};
