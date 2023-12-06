import { Evidently } from "@aws-sdk/client-evidently";

/**
 * Class for managing feature flagging via AWS Evidently.
 * Class method are available for use in next.js server side code.
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/evidently/
 *
 */
export class FeatureFlagManager {
  client: Evidently;
  private _project = process.env.FEATURE_FLAGS_PROJECT;

  constructor() {
    this.client = new Evidently();
  }

  async isFeatureEnabled(featureName: string, userId: string) {
    const evalRequest = {
      entityId: userId,
      feature: featureName,
      project: this._project,
    };

    let featureFlagValue = false;
    try {
      const evaluation = await this.client.evaluateFeature(evalRequest);
      if (evaluation && evaluation.value?.boolValue !== undefined) {
        featureFlagValue = evaluation.value.boolValue;
        console.log({
          message: "Made feature flag evaluation with AWS Evidently",
          data: {
            reason: evaluation.reason,
            userId: userId,
            featureName: featureName,
            featureFlagValue: featureFlagValue,
          },
        });
      }
    } catch (e) {
      console.error({
        message: "Error retrieving feature flag variation from AWS Evidently",
        data: {
          err: e,
          userId: userId,
          featureName: featureName,
        },
      });
    }
    return featureFlagValue;
  }
}
