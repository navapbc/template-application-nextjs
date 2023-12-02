import { Evidently } from "@aws-sdk/client-evidently";

/**
 * Class for managing feature flagging via AWS Evidently.
 * Class method are available for use in next.js server side code.
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/evidently/
 *
 */
export class AWSFeatureFlagManager {
  client: Evidently;
  private _entityId?: string;
  private _config = { region: process.env.AWS_ENV ?? "us-east-1" };
  private _project = process.env.FEATURE_FLAGS_PROJECT
    ? process.env.FEATURE_FLAGS_PROJECT
    : "exampleProjectName";

  constructor(entityId?: string) {
    this._entityId = entityId;
    this.client = new Evidently(this._config);
  }

  async getFeatureFlag(featureName: string, defaultValue = false) {
    const evalRequest = {
      entityId: this._entityId,
      feature: featureName,
      project: this._project,
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
