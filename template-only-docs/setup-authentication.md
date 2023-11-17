# Authentication

Authentication support is provided by [Auth.js](https://authjs.dev/). Any OAuth/OIDC service can be used.

## Setup

1. Copy the `.env.local.example` file to `.env.local` and fill in the values
1. Configure the authentication provider in `auth.ts`. A provider exists for common services, such as [Cognito](https://authjs.dev/reference/core/providers/cognito), [Azure AD](https://authjs.dev/reference/core/providers/azure-ad), or any [custom provider](https://authjs.dev/guides/providers/custom-provider) that implements the OAuth/OIDC specs, such as Login.gov.

### Configuration

Customizing the following features is currently the responsibility of the project:

- [ ] [Configure the middleware](../app/src/middleware.ts) to enforce auth on pages
- [ ] Setup federated sign out. The `signOut` method provided by Auth.js only removes the session from the application, but the user remains logged into the identity provider. This is likely not what you intend. Some of this is specific to the auth provider your project uses, for instance [Cognito has a specific Logout endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html) you send a request to. See the `federateSignOut` and `handleRedirect` in [`auth.ts`](../app/src/auth.ts) for a starting point.
- [ ] Recommended: [Setup refresh token rotation](https://authjs.dev/guides/basics/refresh-token-rotation). Some of this is specific to the auth provider your project uses.
- [ ] Optional: [Override the default authentication pages](https://authjs.dev/guides/basics/pages)
