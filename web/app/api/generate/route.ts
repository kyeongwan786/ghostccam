import { NextResponse } from "next/server";
import type { GenerateImageResponse } from "../../../../shared/ghostcam";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Keep the placement instruction short and explicit. Long, conflicting composition
// rules made the model sometimes choose a distant background instead.
const CLOSE_SUBJECT_PLACEMENT = `
PLACEMENT OVERRIDE — THIS IS THE MOST IMPORTANT RULE:
- Add exactly one ghost immediately beside or just behind the visible person.
- The ghost must touch the person's visual space: cheek-to-cheek, shoulder-to-shoulder,
  leaning against the shoulder, or pressed close along the side of the torso.
- Keep it within arm's reach and on the same depth plane. Never put it in the distant
  background, on a wall, in a reflection, or detached in empty space.
- If only a face is visible, add a connected ghost head, neck, shoulder, and upper torso
  beside that face. If a body is visible, align the ghost's shoulder/torso directly to
  the person's shoulder/torso with natural overlap and contact shadow.
- Do not cover, replace, retouch, or reshape any part of the real person's face or body.
- Never create a floating head, face-only peek, severed neck, sticker, or pasted portrait.
`.trim();

const HORROR_DIRECTION = `
EMOTIONAL TONE:
Make the added figure a frightening ghost in an authentic paranormal photograph.
The result should feel genuinely scary, eerie, uncanny, and like convincing supernatural evidence.
Do not make the ghost beautiful, romantic, friendly, or glamorous.
`.trim();

const DEFAULT_PROMPT = `
Edit the uploaded photograph; do not recreate it from scratch. Preserve the real person's
face, skin, hair, body, clothing, pose, framing, camera perspective, background, lighting,
colors, shadows, reflections, and image noise exactly as they are.

Add exactly one realistic, clearly recognizable supernatural ghost as the only meaningful
change. Make it a solid three-dimensional figure physically present in the same scene. Match
the source photo's scale, perspective, focus, motion blur, white balance, grain, and shadows.
The ghost should feel like a frightening spirit from an authentic paranormal photograph.
Keep the result scary and eerie, not beautiful, romantic, or friendly. Do not use smoke, transparency,
glow, neon, or graphic effects.

${CLOSE_SUBJECT_PLACEMENT}

${HORROR_DIRECTION}

The ghost must have a natural head-to-neck-to-shoulders-to-torso connection. Use realistic
occlusion where the real person overlaps it, and add a subtle contact shadow where the two
figures meet. Do not alter the original subject or invent a new room, object, mirror, door,
window, or background.

Add one very thin red four-corner detection bracket around the ghost, aligned to its actual
position. No full rectangle, beam, glow, text, label, logo, watermark, blood, wounds, gore,
sexualized appearance, cartoon styling, CGI edges, or neon effects.
`.trim();

const PHOTOREALISM_RULES =
  "Final priority: preserve the original photo and ground one frightening ghost immediately beside the visible person's face or body with believable depth, occlusion, lighting, and contact shadow.";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY가 설정되지 않았습니다. .env.local을 확인해주세요." }, { status: 500 });
  }

  const form = await request.formData();
  const image = form.get("image");
  const customPrompt = String(form.get("prompt") || "").trim();

  if (!(image instanceof File) || !image.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일을 업로드해주세요." }, { status: 400 });
  }
  if (image.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "이미지는 10MB 이하만 사용할 수 있습니다." }, { status: 400 });
  }
  if (customPrompt.length > 1000) {
    return NextResponse.json({ error: "프롬프트는 1,000자 이하로 입력해주세요." }, { status: 400 });
  }

  // One image-edit request is enough. Low quality is the fastest supported draft mode;
  // JPEG also reduces the response payload and is faster than PNG encoding.
  const prompt = [DEFAULT_PROMPT, customPrompt ? `Additional user direction: ${customPrompt}` : "", PHOTOREALISM_RULES]
    .filter(Boolean)
    .join("\n\n");

  const body = new FormData();
  body.append("model", "gpt-image-2");
  body.append("image", image, image.name || "ghostcam-input.png");
  body.append("prompt", prompt);
  body.append("size", "auto");
  body.append("quality", "low");
  body.append("output_format", "jpeg");
  body.append("output_compression", "82");

  try {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
      signal: AbortSignal.timeout(125_000),
    });
    const payload = (await response.json()) as {
      data?: Array<{ b64_json?: string }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: payload.error?.message || "이미지 생성에 실패했습니다." },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    const base64 = payload.data?.[0]?.b64_json;
    if (!base64) {
      return NextResponse.json({ error: "생성된 이미지가 응답에 없습니다." }, { status: 502 });
    }

    const result: GenerateImageResponse = {
      image: `data:image/jpeg;base64,${base64}`,
    };
    return NextResponse.json(result);
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    return NextResponse.json(
      { error: timedOut ? "생성 시간이 너무 길어 중단했습니다. 잠시 후 다시 시도해주세요." : "OpenAI 서버와 통신하지 못했습니다." },
      { status: 504 },
    );
  }
}
