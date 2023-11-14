# Authentication

1. Copy the `.env.local.example` file to `.env.local` and fill in the values
1. Configure the authentication provider in `auth.ts`. A provider exists for common services, such as [Cognito](https://authjs.dev/reference/core/providers/cognito), [Azure AD](https://authjs.dev/reference/core/providers/azure-ad), or any [custom provider](https://authjs.dev/guides/providers/custom-provider) that implements the OAuth/OIDC specs, such as Login.gov.

## Example Cognito authentication

By default, the template provides a basic AWS Cognito integration example. Any Navanaut can get access to a sandbox AWS account to test this out.

### Creating a user pool

To create your own Cognito instance:

**Configure security requirements**

When creating a user pool just for testing the template, avoid enabling SMS sending since this requires additional setup and verification.

**Configure sign-up experience**

- Select "Enable self-registration"
- Avoid adding "Required attributes" since these can't be changed after the fact

**Configure message delivery**

When creating a user pool just for testing the template, select "Send email with Cognito"

**Integrate your app**

- Select "Use the Cognito Hosted UI"
- Select "Confidential client"
- Enter `http://localhost:3000/api/auth/callback/cognito` as the callback URL

### Configuring the template

1. Find the created Cognito app client under the "App integration" tab in the user pool.
1. Copy the client ID and secret
1. Paste the client ID and secret into the `.env.local` file
