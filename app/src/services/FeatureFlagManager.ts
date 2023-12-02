import { Evidently } from "@aws-sdk/client-evidently";

/**
 * Class for managing feature flagging via AWS Evidently.
 * Class method are available for use in next.js server side code.
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/evidently/
 *
 */
export class AWSFeatureFlagManager {
  private _entityId?: string;
  client: Evidently;
  private _config = { region: process.env.AWS_ENV ?? "us-east-1" };

  constructor(entityId?: string) {
    this._entityId = entityId ?? "anonymous";
    this.client = new Evidently(this._config);
  }

  async getFeatureFlag(featureName: string, defaultValue = false) {
    const project = process.env.FEATURE_FLAGS_PROJECT ?? "exampleProjectName";
    const evalRequest = {
      entityId: this._entityId,
      feature: featureName,
      project,
    };

    let featureFlagValue = defaultValue;
    try {
      const evaluation = await this.client.evaluateFeature(evalRequest);
      if (evaluation && evaluation.value?.boolValue !== undefined) {
        featureFlagValue = evaluation.value.boolValue;
        console.log({
          message: "Made feature flag evaluation with AWS Evidently",
          data: {
            reason: evaluation.reason,
            entityId: this._entityId,
            featureName: featureName,
            featureFlagValue: featureFlagValue,
          },
        });
      }
    } catch (e) {
      console.log({
        message: "Error retrieving feature flag variation from AWS Evidently",
        data: {
          err: e,
          entityId: this._entityId,
          featureName: featureName,
        },
      });
    }
    return featureFlagValue;
  }
}
