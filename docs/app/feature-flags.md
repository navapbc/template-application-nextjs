# Feature flagging

- [AWS Evidently](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Evidently.html) is used for feature flagging
- For more information about the decision-making behind using Evidently, [this infra ADR is available](https://github.com/navapbc/template-infra/blob/68b2db42d06198cb070b0603e63a930db346309f/docs/decisions/infra/0010-feature-flags-system-design.md)
- Additional documentation of the feature flagging solution is available in [infra docs](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md)

## How it works

Call `isFeatureEnabled` from server-side code to retrieve the feature flag value:

```ts
import { isFeatureEnabled } from "src/adapters/feature-flags";

function ServerComponent() {
  const hasNewFeature = isFeatureEnabled("use-new-feature");
  return <div>{hasNewFeature ? "Feature enabled" : "Feature disabled"}</div>;
}
```

If a client-side component needs to know the feature flag value, pass it as a prop:

```ts
function ServerComponent() {
  const hasNewFeature = isFeatureEnabled("use-new-feature");

  return <ClientComponent hasNewFeature={hasNewFeature} />;
}
```

## Local development

### Mocking Evidently

When the `FEATURE_FLAGS_PROJECT` environment variable is unset, the app will fall back to use a mock adapter, which defaults flag values to `false`.

To enable a mocked feature flag, add an environment variable to `app/.env.local`, replacing `foo` with the name of the feature flag you want to mock:

```bash
NEXT_PUBLIC_FEATURE_foo=true
```

### Using AWS credentials

If you want to test Evidently locally, use your AWS IAM credentials. Once you set `FEATURE_FLAGS_PROJECT` and the AWS environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`) in `app/.env.local`, calls to Evidently will succeed.

## Testing

To test server-side code that uses feature flags, you can use the `mockFeatureFlag` utility:

```ts
import { mockFeatureFlag } from "tests/server-utils";

it("shows the new feature when enabled", () => {
  mockFeatureFlag("use-new-feature", true);

  const component = render(<ServerComponent />);

  // ...
```

## Creating a new feature flag

Feature flags are defined as part of the infra-as-code. [See the infra docs to learn more](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md).

## Toggling feature flags

Toggle feature flags on/off via the AWS Console GUI. More information [here](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md#managing-feature-releases-and-partial-rollouts-via-aws-console).
