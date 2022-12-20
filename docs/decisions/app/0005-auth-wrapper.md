# Authentication wrapper

- Status: [proposed]
- Deciders: Ali, Sawyer
- Date: 2022-12-16
- Technical Story: As a user, I want to be able to easily integrate authentication into my react application with common identity providers, such as login.gov

## Context and Problem Statement

A common requirement for government projects is working with authentication providers. As a result, having a built-in wrapper will help avoid repeated work across projects long-term.

## Decision Drivers

- Framework agnostic
- Non-blocking: The user of this repository can decide whether they want to use authentication or not:
  - login.gov
  - openID
  - opt-out

## Considered Options

- Generic authentication wrapper
- Document authentication strategies and let the project team decide on their approach
- Leave the responsibility to each project team

## Decision Outcome

In-progress

_Positive Consequences_

- Can be used signify which pages should be authenticated
- Connects to module built in this work that integrates with the providers listed above
- Provides a template for managing user authentication state

_Negative Consequences_

- If there are no authentication requirements, this work will not apply to such projects.

## Pros and Cons of the Options

_Create a Authentication wrapper_

We can create a generic authentication wrapper that:

1. Is framework agnostic, meaning that any react application can utilize this wrapper
2. Bootstraps future projects by providing a built-in authentication layer into the application

The approach that I would suggest is using [React Context](https://reactjs.org/docs/context.html) which:

1. Can be used by **any** react project
2. **Abstracts complex logic** - It’ll produce less clutter in individual components as the individual component doesn't need to worry about the underlying authentication provider or methods (e.g: calling `login()`)

_Example_

We can create an auth context to manage common authentication usages such as:

- Getting the user data
- Logging the user in / out
- Managing loading state

`authContext.js`:

```js
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const routesToNotProtect = [
    /* Routes defined here or in another file */
  ];

  useEffect(() => {
    // get user data from cookie or call to api
  }, []);

  const login = async (email, password) => {
    // Logs user in and sets cookie
  };

  const logout = (email, password) => {
    // Removes cookie and resets user state
  };

  // protect routes - this can also be a HOC that wraps protected routes or vice-versa
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== routesToNotProtect)
  ) {
    // redirect to login page, other defined page, or display component
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

For a `Nextjs` application, the authentication wrapper can be provided to the entire application as such:

```js
_app.js;
function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

To summarize, the purpose of the authentication wrapper would be:

1. Provide an API that **abstracts** common authentication methods such as logging in/out.
2. **Manage** the authentication state, e.g: username, email, etc.. that gets returned from the identity provider and loading state.
3. **Protect** defined routes

With the above recommendation, I would also like to document how we can implement two different identity provider API's, [login.gov](https://login.gov/) and [openID](https://openid.net/connect/).

#### Login.gov

#### openID

_Document common authentication strategies_

Instead of providing a built-in solution to this project, we can **document** authentication strategies either in this repository or in a confluence document.

Some benefits of this approach are:

- Provides documented strategies and approaches to authentication on the frontend which **existing** and **new teams** can leverage.
-

_Leave the responsibility to each project team_

I believe this is the least desireable outcome as authentication is a common requirement in most applications. In the event a project does not need authentication, the project team could opt out of using whichever decision gets made from this document.

## Links

- [A good article on react context with higher-order components](https://dev.to/lennythedev/prop-drilling-react-context-and-higher-order-component-hoc-40m9)
- Login.gov
  - [Login.gov documentation](https://developers.login.gov/)
  - [User attributes](https://developers.login.gov/attributes/)
- openId
  - [FAQ](https://openid.net/connect/faq/)
  - [Connect protocol overview](https://openid.net/specs/openid-connect-core-1_0.html#Overview)
