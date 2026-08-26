const RESULT_KEY = "ghostcam-result";
const ANALYSIS_KEY = "ghostcam-analysis";

export function saveResult(image: string, analysis: unknown = null): void {
  sessionStorage.setItem(RESULT_KEY, image);
  sessionStorage.setItem(ANALYSIS_KEY, JSON.stringify(analysis));
}

export function loadResult(): string {
  return sessionStorage.getItem(RESULT_KEY) || "";
}
