// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-evidently/Interface/EvaluateFeatureCommandOutput/
export class Evidently {
  evaluateFeature = () => {
    return Promise.resolve({
      details: "experimentName",
      reason: "LAUNCH_RULE_MATCH",
      value: { boolValue: true },
    });
  };
}
