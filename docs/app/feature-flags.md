# Feature flagging

- [AWS Evidently](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Evidently.html) is used for feature flagging
- For more information about the decision-making behind using Evidently, [this infra ADR is available](https://github.com/navapbc/template-infra/blob/68b2db42d06198cb070b0603e63a930db346309f/docs/decisions/infra/0010-feature-flags-system-design.md)
- Additional documentation of the feature flagging solution is available in [infra docs](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md)

## How it works

1. `services/feature-flags/FeatureFlagManager` provides a service layer to interact with AWS Evidently endpoints. For example, class method `isFeatureEnabled` calls out to Evidently to retrieve a feature flag value we can then return to the client
1. Pages can call `isFeatureEnabled` from Next.js server side code and return the feature flag value to components as props.

## Local development

Out-of-the-box, local calls where `FEATURE_FLAGS_PROJECT` environment variable is unset will fall back to use `LocalFeatureFlagManager` which defaults flag values to `false`. 

If you want to test Evidently locally, use your AWS IAM credentials. Once you set `FEATURE_FLAGS_PROJECT` and the AWS environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`) in `app/.env.local`, calls to Evidently will succeed. 

## Creating a new feature flag

To create a new feature flag, update `/infra/[app_name]/app-config/main.tf`. More information available in infra repository [docs](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md).

## Toggling feature flags

Toggle feature flags via the AWS Console GUI. More information [here](https://github.com/navapbc/template-infra/blob/main/docs/feature-flags.md#managing-feature-releases-and-partial-rollouts-via-aws-console).
