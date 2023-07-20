# Use NextAuth over custom/provider specific solution for authentication

- Status: [proposed]
- Deciders: @sawyerh, @aligg, @lorenyu
- Date: 2023-07-20
- Technical Story: As a user, I want to be able to easily integrate authentication into my react application with common identity providers, such as login.gov

## Context and Problem Statement

A common requirement for government projects is working with an identity provider (Such as login.gov or AWS Cognito). It isn't uncommon for authentication providers to be changed during the lifecycle of a project. We want to ease the concern of being "locked in" to one provider. [NextAuth](https://next-auth.js.org/) fills this need by allowing us to easily swap identity providers.

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

**Pros**

1. [Well supported](https://github.com/nextauthjs/next-auth)
2. Extensible. NextAuth supports a variety of built-in [Providers](https://next-auth.js.org/providers/), support for [custom Providers](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider), and [Adapters](https://next-auth.js.org/adapters).

**Cons**

1. 

### Provider specific Integration

**Pros**
  
1. Documentation is generally talored towards using the given service with the package.


**Cons**

1. Not all identity providers offer a package, thus requiring a custom solution. 
2. Generally, you are "locked-in" to that provider. In order to migrate away from the given provider, you will most likely need extensible code changes to support this lift.
3. It may not always be optimized for how we develop applications using Next.js.
  

### Custom Authentication Wrapper


**Pros**

1. We have full control of the underlying mechanism for interacting with authentication providers.


**Cons**

1. We will need to maintain this.
2. May be more complicated to support more use-cases as we scale.


### Leave the responsibility to each project team

I believe this is the least desireable outcome as authentication is a common requirement in most applications. In the event a project does not need authentication, the project team could opt out of using whichever decision gets made from this document.
