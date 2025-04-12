Set Up Environment Variables
Set up your environment variables in the .env file using the .env.example file as a reference.

Alternatively, you can run cp .env.example .env to get started with our handpicked defaults.

Start Database and Mail Server
Run npm run dx in the root directory.

This will spin up a Postgres database and inbucket mailserver in a docker container.

Start the Application
Run npm run dev in the root directory to start the application.

(Optional) Fasten the Process
Want it even faster? Just use:

npm run d
Access Points for the Project
You can access the following services:

Main application - http://localhost:3000
Incoming Mail Access - http://localhost:9000
Database Connection Details:
Port: 54320
Connection: Use your favourite database client to connect to the database.
S3 Storage Dashboard - http://localhost:9001
Install Dependencies
Run npm i in the root directory to install the dependencies required for the project.

Set Up Environment Variables
Set up the following environment variables in the .env file:

NEXTAUTH_SECRET
NEXT_PUBLIC_WEBAPP_URL
NEXT_PRIVATE_DATABASE_URL
NEXT_PRIVATE_DIRECT_DATABASE_URL
NEXT_PRIVATE_SMTP_FROM_NAME
NEXT_PRIVATE_SMTP_FROM_ADDRESS
Alternatively, you can run cp .env.example .env to get started with our handpicked defaults.

Create Database Schema
Create the database schema by running the following command:

npm run prisma:migrate-dev
Optional: Seed the Database
Seed the database with test data by running the following command:

npm run prisma:seed -w @documenso/prisma
Start the Application
Run npm run dev in the root directory to start the application.

Access the Application
Access the Documenso application by visiting http://localhost:3000 in your web browser.
Create Your Signing Certificate
Digitally signing documents requires a signing certificate in .p12 format. You can either purchase one or create a free self-signed certificate.

Follow the steps below to create a free, self-signed certificate for local development.

These steps should be run on a UNIX based system, otherwise you may run into an error.

Generate Private Key
Generate a private key using OpenSSL by running the following command:

openssl genrsa -out private.key 2048
This command generates a 2048-bit RSA key.

Generate Self-Signed Certificate
Using the private key, generate a self-signed certificate by running the following command:

openssl req -new -x509 -key private.key -out certificate.crt -days 365
You will be prompted to enter some information, such as the certificate's Common Name (CN). Ensure that you provide the correct details. The —days parameter specifies the certificate's validity period.

Create p12 Certificate
Combine the private key and the self-signed certificate to create a .p12 certificate. Use the following command:

openssl pkcs12 -export -out certificate.p12 -inkey private.key -in certificate.crt -legacy
When running the application in Docker, you may encounter permission issues when attempting to sign documents using your certificate (.p12) file. This happens because the application runs as a non-root user inside the container and needs read access to the certificate.

To resolve this, you'll need to update the certificate file permissions to allow the container user 1001, which runs NextJS, to read it:

sudo chown 1001 certificate.p12
p12 Certificate Password
When you create the .p12 certificate, you will be prompted to enter a password. Enter a strong password and keep it secure. Remember this password, as it will be required when using the certificate.

Note that for local development, the password can be left empty.

Add Certificate to the Project
Use the NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH environment variable to point at the certificate you created.
About
Documenso uses the following stack to handle translations:

Lingui - React i10n library
Crowdin - Handles syncing translations
OpenAI - Provides AI translations
Additional reading can be found in the Lingui documentation.

Quick guide
If you require more in-depth information, please see the Lingui documentation.

HTML
Wrap all text to translate in <Trans></Trans> tags exported from @lingui/react/macro.

<h1>
  <Trans>Title</Trans>
</h1>
For text that is broken into elements, but represent a whole sentence, you must wrap it in a Trans tag so ensure the full message is extracted correctly.

<h1>
  <Trans>
    This is one
    <span className="text-foreground/60">full</span>
    <a href="https://documenso.com">sentence</a>
  </Trans>
</h1>
Constants outside of react components
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
 
// Wrap text in msg`text to translate` when it's in a constant here, or another file/package.
export const CONSTANT_WITH_MSG = {
  foo: msg`Hello`,
  bar: msg`World`,
};
 
export const SomeComponent = () => {
  const { _ } = useLingui();
 
  return (
    <div>
      {/* This will render the correct translated text. */}
      <p>{_(CONSTANT_WITH_MSG.foo)}</p>
    </div>
  );
};
Plurals
Lingui provides a Plural component to make it easy. See full documentation here.

// Basic usage.
<Plural one="1 Recipient" other="# Recipients" value={recipients.length} />
Dates
Lingui provides a DateTime instance with the configured locale.

import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
 
export const SomeComponent = () => {
  const { i18n } = useLingui();
 
  return <Trans>The current date is {i18n.date(new Date(), { dateStyle: 'short' })}</Trans>;
};