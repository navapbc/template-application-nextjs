# Use NextAuth over custom/provider specific solution for authentication

- Status: [proposed]
- Deciders: @sawyerh, @aligg, @lorenyu
- Date: 2023-07-20
- Technical Story: As a user, I want to be able to easily integrate authentication into my react application with common identity providers, such as login.gov

## Context and Problem Statement

A common requirement for government projects is working with an identity provider (Such as login.gov or AWS Cognito). It isn't uncommon for authentication providers to be changed during the lifecycle of a project. We want to ease the concern of being "locked in" to one provider. [NextAuth](https://next-auth.js.org/) fills this need by allowing us to easily swap identity providers and providing helpful functions for retrieving user data.

## Decision Drivers

- **Extensible** - The user of this codebase can integrate with a variety of authentication providers.
- **Maintained** - The NextAuth package is well-maintained and supported.
- **Ease of use** - Developers can easily integrate the suggested approach to their applications.


## Considered Options

- NextAuth
- Provider specific solution (such as [AWS Amplify](https://aws.amazon.com/amplify/) or [Azure AD](https://azure.microsoft.com/en-us/products/active-directory))
- Custom authentication wrapper
- Leave the responsibility to each project team

## Decision Outcome

In-progress

## Pros and Cons of the Options

### NextAuth

Pros:

1. **Well supported and maintained**: NextAuth is actively developed and has a strong community behind it, providing ongoing support and updates.
2. **Extensible**: NextAuth supports a variety of built-in [Providers](https://next-auth.js.org/providers/), support for [custom Providers](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider), and [Adapters](https://next-auth.js.org/adapters). Using a custom provider, it is easy to extend 
3. Seamless integration with Next.js: NextAuth is designed to work seamlessly with Next.js applications. It provides a simple way to handle authentication in server-rendered and client-side rendered pages, ensuring a smooth user experience.

Cons:
1.	Dependency on Next.js: NextAuth is tightly coupled with Next.js framework. If you are not using Next.js, integrating NextAuth into your existing stack may require additional effort.
2.	Learning curve for customization: While NextAuth offers a high level of customization, extending it beyond the built-in functionalities may require a deeper understanding of the library and its underlying concepts.
3.	Possible migration challenges: If you decide to switch away from NextAuth in the future, migrating to a different authentication solution may introduce complexities, especially if your application relies heavily on NextAuth-specific features.


### Provider specific Integration

Pros:
1. Dedicated documentation and support.
2. Tailored features and optimizations.
3. Seamless integration with provider services.
4. Vendor-specific features and benefits.

Cons:
1. Vendor lock-in.
2. Limited provider options.
3. Inflexibility with future migration.
4. Compatibility with your tech stack.
5. Learning curve for multiple providers.
  


### Leave the responsibility to each project team

I believe this is the least desireable outcome as authentication is a common requirement in most applications. In the event a project does not need authentication, the project team could opt out of using whichever decision gets made from this document.

Pros:
1. Flexibility for individual project needs.
2. Customization and autonomy.
3. Reduced dependencies and overhead.

Cons:
1. Inconsistent security practices.
2. Lack of knowledge sharing and collaboration.
3. Increased development effort and duplication.
4. Complexity in managing multiple authentication solutions.

## Example Implementation

The entirety of the Login.gov User attributes can be found here: https://developers.login.gov/attributes/. 

We can create a seperate type file to map those attributes 

**Filename**: `loginGovProvider.ts`
```ts
import { OAuth2Provider } from "next-auth/providers";

const LoginGovProvider = () =>
  OAuth2Provider({
    id: "login-gov",
    name: "Login.gov",
    scope: "openid email profile", // Define the required scopes
    clientId: "YOUR_LOGIN_GOV_CLIENT_ID",
    clientSecret: "YOUR_LOGIN_GOV_CLIENT_SECRET",
    authorizationUrl: "https://YOUR_LOGIN_GOV_DOMAIN/authorization", // Replace with the actual login.gov domain
    tokenUrl: "https://YOUR_LOGIN_GOV_DOMAIN/token", // Replace with the actual login.gov domain
    profileUrl: "https://YOUR_LOGIN_GOV_API_DOMAIN/userinfo", // Replace with the actual login.gov API domain
    profile: (profile) => {
      // Parse and transform the profile data
      return {
        id: profile.sub,
        firstName: profile.given_name, // aka first name
        lastName: profile.family_name, // aka last name
        email: profile.email,
        // and any other fields you need
      };
    },
  });

export default LoginGovProvider;
```

**Filename**: `next-auth.config.js`
```js
import LoginGovProvider from "./loginGovProvider";

export default NextAuth({
  // ...
  providers: [
    // Other providers you may have
    LoginGovProvider(),
  ],
  // ...
});
```

