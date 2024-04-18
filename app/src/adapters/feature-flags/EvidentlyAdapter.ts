import { Evidently } from "@aws-sdk/client-evidently";

import { FeatureFlagAdapter } from "./types";

/**
 * Class for managing feature flagging via AWS Evidently.
 * Class method are available for use in next.js server side code.
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/evidently/
 */
export class EvidentlyAdapter implements FeatureFlagAdapter {
  client: Evidently;
  private _project = process.env.FEATURE_FLAGS_PROJECT;

  constructor(client = new Evidently()) {
    this.client = client;
  }

  async isFeatureEnabled(featureName: string, entityId = "unknown") {
    const evalRequest = {
      entityId,
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
            entityId,
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
          entityId,
          featureName,
        },
      });
    }
    return featureFlagValue;
  }
}
