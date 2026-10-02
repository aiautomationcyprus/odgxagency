export default async (event) => {
  const payload = JSON.parse(event.body).payload;
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

  // Mail an Agentur
  await resend({
    from: 'ODGX Kontaktformular <onboarding@resend.dev>',
    to: 'info@online-digitalx.de',
    reply_to: email,
    subject: `Neue Anfrage von ${name} – ${paket || 'Allgemeine Anfrage'}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Paket:</strong> ${paket || '–'}</p>
      <p><strong>Nachricht:</strong><br>${message || '–'}</p>
    `,
  });

  // Bestätigungsmail an Kunde (aktiv sobald Domain digital-x.agency verifiziert)
  await resend({
    from: 'ODGX Podcast <noreply@digital-x.agency>',
    to: email,
    reply_to: 'info@online-digitalx.de',
    subject: 'Ihre Anfrage bei ODGX – wir melden uns!',
    html: `
      <p>Hallo ${name},</p>
      <p>vielen Dank für Ihre Anfrage. Wir haben folgende Angaben erhalten:</p>
      <ul>
        <li><strong>Paket:</strong> ${paket || '–'}</li>
        <li><strong>Nachricht:</strong><br>${message || '–'}</li>
      </ul>
      <p>Wir melden uns in der Regel innerhalb eines Werktages.</p>
      <p>Beste Grüße<br>Das ODGX Team<br>digital-x.agency</p>
    `,
  });

  return new Response('OK', { status: 200 });
};
