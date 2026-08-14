import { google } from 'googleapis';

/**
 * Creates a Google Auth client from the service account credentials
 * stored in the GOOGLE_SERVICE_ACCOUNT_JSON env var.
 */
export function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) {
    console.error('[Google Auth] GOOGLE_SERVICE_ACCOUNT_JSON env var is missing or empty');
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON env var');
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (parseError) {
    console.error('[Google Auth] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON - check for extra quotes or formatting issues:', parseError);
    throw new Error('Invalid JSON in GOOGLE_SERVICE_ACCOUNT_JSON');
  }

  if (!credentials.client_email || !credentials.private_key) {
    console.error('[Google Auth] Parsed JSON is missing client_email or private_key fields');
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is missing required fields');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  return auth;
}
