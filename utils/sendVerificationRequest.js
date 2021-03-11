import nodemailer from 'nodemailer'; // Nodemailer to send email

/**
 * Sends verification request email via nodemailer
 * @param {String} email of requesting user
 * @param {String} url to use to authenticate user
 * @param {Object} provider to feed information about mail specifics
 * @returns promise, resolving to a successful nodemailer email send
 */
const sendVerificationRequest = ({ identifier: email, url, provider }) => {
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Collect mail server and from email
    const { server, from } = provider;

    // Create mail with server
    nodemailer.createTransport(server).sendMail(
      {
        to: email,
        from,
        subject: 'Sign in to Dancefest',
        // Render text if email client does not support html
        text: text({ url, email }),
        // Else, render html
        html: html({ url, email }),
      },
      error => {
        // If error
        if (error) {
          // Reject promise
          return reject(new Error(error));
        }

        // Else, resolve
        return resolve();
      }
    );
  });
};

/**
 * Render html email
 * @param {String} url to redirect
 * @param {String} email of requesting user
 * @returns email html
 */
const html = ({ url, email }) => {
  // Collect escaped email (for various email clients that might parse as link)
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;

  // Generate html email template
  return `
    <body
      style="
        background-color: #f5f6f7;
        padding: 30px;
        text-align: center;
        font-family: 'Arial';
      "
    >
      <img
        src="https://www.ossdancefest.com/images/logo.png"
        style="width: 200px; padding-bottom: 10px"
        alt="Dancefest logo"
      />
      <div
        style="background-color: #fff; border-radius: 10px; padding: 20px 20px"
      >
        <h1
          style="
            color: #a72a1d;
            font-size: 32px;
            line-height: 38px;
            margin-top: 0px;
            margin-bottom: 5px;
          "
        >
          Welcome to Dancefest!
        </h1>
        <p
          style="
            color: #42526e;
            max-width: 500px;
            font-size: 18px;
            line-height: 150%;
            margin: 0px auto;
          "
        >
          Press the button below to authenticate as ${escapedEmail} and sign in to
          Dancefest.
        </p>
        <div style="padding: 50px 0px">
          <a
            href=${url}
            style="
              background-color: #42526e;
              color: #fff;
              padding: 15px 40px;
              border-radius: 4px;
              font-size: 18px;
              text-decoration: none;
            "
            >Open Dancefest</a
          >
        </div>
        <span style="color: #42526e; font-size: 14px"
          >If you did not request this email, you can safely ignore it.</span
        >
      </div>
    </body>
  `;
};

/**
 * Render text email fallback
 * @param {String} url to redirect
 * @param {String} email of requesting user
 * @returns email string
 */
const text = ({ url, email }) => `Sign in to Dancefest as ${email}:\n${url}\n\n`;

// Export email verification request handler
export default sendVerificationRequest;
