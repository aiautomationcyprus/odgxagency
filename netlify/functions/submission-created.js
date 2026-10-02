export default async (event) => {
  const payload = JSON.parse(event.body).payload;
  const { name, email, paket, message } = payload.data;

  if (!email) return new Response('No email', { status: 200 });

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    }),
  });

  return new Response('OK', { status: 200 });
};

