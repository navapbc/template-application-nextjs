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
  private _userId?: string;
  private _project = process.env.FEATURE_FLAGS_PROJECT;

  constructor(userId?: string) {
    this._userId = userId;
    this.client = new Evidently();
  }

  async isFeatureEnabled(featureName: string) {
    const evalRequest = {
      entityId: this._userId,
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
            userId: this._userId,
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
          userId: this._userId,
          featureName: featureName,
        },
      });
    }
    return featureFlagValue;
  }
}
