import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
// 결과 분석은 비용을 최소화하기 위해 저가 비전 모델로 분리한다.
const GHOST_VARIATIONS = [
  "COMPOSITION VARIANT: Place a clearly recognizable ghost extremely close beside the subject's face, cheek-to-cheek or just behind one shoulder. Show a readable head, hair, shoulders, and facial silhouette with enough contrast to be unmistakable. Do not cover or alter the real person's face.",
  "COMPOSITION VARIANT: Place a clearly visible full or three-quarter ghost in the background, standing in a doorway, hallway, or between objects. Keep depth-accurate scale, but make the figure and its outline clearly readable at normal viewing size; do not hide it in haze.",
  "COMPOSITION VARIANT: Put a clearly recognizable ghost in a mirror, window, phone screen, or reflective surface. The reflection should be visibly readable and subtly contradict reality, while the solid original scene remains unchanged.",
  "COMPOSITION VARIANT: Make the ghost crouch low near the floor, under a table, beside a bed, or behind furniture. Show a clearly readable head, hands, or folded body silhouette with strong enough separation from the background to identify it.",
  "COMPOSITION VARIANT: Place the ghost at the extreme edge of the frame, partially cut off as if it is leaning around a wall or doorframe and watching the subject. It must not be centered.",
  "COMPOSITION VARIANT: Make the ghost sit naturally in the scene, such as on a chair, bed, stairs, or in the back seat, with an unusual rigid posture. Its head and body must remain clearly distinguishable from the furniture and background.",
  "COMPOSITION VARIANT: Show a clearly readable ghostly silhouette behind a translucent curtain, frosted glass, shower door, or fabric. Preserve the material, but make the figure's head, shoulders, and body outline visibly identifiable through it.",
  "COMPOSITION VARIANT: Use an impossible posture: the ghost is upside down, bent at an unnatural angle, or peering from above a doorway. Keep the entire figure sufficiently visible and contrasty to be recognized immediately.",
  "COMPOSITION VARIANT: Create a partial apparition visible through a gap, such as a slightly open door, cabinet, elevator, or curtain. Show enough of the eye, hand, head, or half-body to make the presence clearly detectable; do not reduce it to an indistinct blur.",
  "COMPOSITION VARIANT: Add a visible double exposure or delayed afterimage of a person in a place the real subject could not have occupied, aligned with the existing motion and light. The afterimage must remain clearly discernible, not faint or washed out.",
  "COMPOSITION VARIANT: Place the presence close behind the subject but facing away or turned sideways, showing its back, hair, and clothing rather than a front-facing human figure. Keep it clearly different from a generic standing pose.",
  "COMPOSITION VARIANT: Place the presence within a crowd, poster, photograph, or background pattern, but make its eyes or silhouette clearly recognizable without zooming in. Preserve the original scene and do not add extra people everywhere.",
];

const DEFAULT_PROMPT = `
Edit the uploaded photograph, do not recreate it from scratch. Treat the original image as a locked photographic plate: preserve the real person's face, skin texture, hair, body, clothing, pose, framing, camera perspective, background, architecture, furniture, reflections, colors, exposure, white balance, shadows, lens characteristics, and natural image noise exactly as they are. Do not beautify, retouch, sharpen, repaint, redraw, replace, or reinterpret any existing part of the photo.

Add exactly one realistic anomalous human presence as the only meaningful visual change, following the selected composition variant. It must look like a real person accidentally captured by the same camera in the same room: anatomically plausible but unsettling, with realistic hair, skin, fabric, depth, occlusion, contact shadows, ambient light, focus falloff, motion blur, compression artifacts, and sensor grain that match the source photo. Make it subtly pale, desaturated, underexposed, or partially occluded only if that helps it sit naturally in the scene. It must be visible at normal viewing size, but it should feel like a believable photographic anomaly rather than a fantasy illustration.

Avoid all painterly, cartoon, 3D-rendered, plastic, airbrushed, poster-like, cutout, sticker-like, smoky, glowing, neon, perfectly smooth, symmetrical, or high-contrast horror effects. Do not use transparent white clothing, empty black eye sockets, exaggerated facial features, fantasy costumes, clean CGI edges, or artificial rim light. Do not alter the original subject or invent a new background. Do not turn any solid surface into glass or change the scene layout. If the selected placement would require changing an existing object, choose a nearby physically plausible location instead.

Add one very thin red four-corner detection bracket around the anomalous presence, aligned to its actual position and perspective. Keep the bracket minimal and photographic, with no full rectangle, scanning beam, glow, words, letters, labels, logos, UI, or watermark. No blood, wounds, exposed anatomy, sexualized appearance, or gore.
`.trim();

const PHOTOREALISM_RULES =
  "Photorealism priority: the original image must remain visually dominant and unchanged; the anomaly must inherit the source camera's lighting, white balance, focus, grain, compression, perspective, and occlusion. It should look composited into a real photograph, never illustrated or generated as a standalone character.";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY가 설정되지 않았습니다. .env.local을 확인해주세요." },
      { status: 500 },
    );
  }

  const form = await request.formData();
  const image = form.get("image");
  const customPrompt = String(form.get("prompt") || "").trim();
  const prompt = `${customPrompt || DEFAULT_PROMPT}\n\n${GHOST_VARIATIONS[Math.floor(Math.random() * GHOST_VARIATIONS.length)]}\n\n${PHOTOREALISM_RULES}`;

  if (!(image instanceof File) || !image.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일을 업로드해주세요." }, { status: 400 });
  }
  if (image.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "이미지는 10MB 이하만 사용할 수 있습니다." }, { status: 400 });
  }
  if (customPrompt.length > 1000) {
    return NextResponse.json({ error: "프롬프트는 1,000자 이하로 입력해주세요." }, { status: 400 });
  }

  const body = new FormData();
  body.append("model", "gpt-image-2");
  body.append("image", image, image.name || "ghostcam-input.png");
  body.append("prompt", prompt || DEFAULT_PROMPT);
  body.append("size", "auto");
  body.append("quality", "high");

  try {
    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
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

    const resultImage = `data:image/png;base64,${base64}`;
    return NextResponse.json({ image: resultImage });
  } catch {
    return NextResponse.json({ error: "OpenAI 서버와 통신하지 못했습니다." }, { status: 502 });
  }
}
