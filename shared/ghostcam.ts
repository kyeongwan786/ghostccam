/** Types shared by the web client, native app, and image-generation API. */

export interface GenerateImageResponse {
  image: string;
  analysis?: unknown;
}

export interface GenerateErrorResponse {
  error: string;
}
