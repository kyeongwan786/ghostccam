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

const PLACEMENT_VARIATIONS: Record<string, string> = {
  close_subject:
    "COMPOSITION VARIANT: The real person is the primary anchor. Place the connected ghost immediately beside the person's face, cheek, shoulder, upper torso, or body silhouette—within arm's reach and on the same depth plane, as if it were physically standing or leaning right next to them when the photo was taken. For a selfie or close portrait, keep the ghost only a few centimeters beside or just behind the face/shoulder, using the narrow real space visible next to the person; for a wider shot, attach it to the side or rear edge of the person's visible body. Keep the real person's face and body untouched. Show the ghost's head, neck, shoulders, and connected upper torso with correct scale, depth, focus, contact shadow, and natural occlusion. Never place it far in the background, on a wall, or detached from the person.",
  behind_furniture:
    "COMPOSITION VARIANT: Place the connected ghost naturally behind or beside an existing chair, sofa, table, bed, or other visible furniture. Let the furniture visibly occlude part of the body and anchor the ghost in the room with contact shadows and matching perspective. Do not invent or alter furniture.",
  doorway_or_opening:
    "COMPOSITION VARIANT: Place the connected ghost inside an already visible open doorway, hallway, or opening. Use the existing opening only; do not create a new door, wall, hallway, or room. The ghost must stand on the visible floor or be naturally occluded by the real frame.",
  reflection:
    "COMPOSITION VARIANT: Place the connected ghost only inside a clearly visible existing mirror, window, or reflective surface. Do not invent a reflection surface. Preserve the solid original scene and obey the real surface's perspective and lighting.",
  edge_of_frame:
    "COMPOSITION VARIANT: Place the connected ghost at a real edge of the existing frame, partially occluded by a visible wall, furniture, or object. It must occupy physical space behind that object, not appear painted on it or float in empty space.",
  background_depth:
    "COMPOSITION VARIANT: Place the connected ghost in the deepest believable open space already visible in the background, beside or behind existing objects. Do not create doors, windows, hallways, furniture, walls, or new rooms. Use the existing floor, occlusion, perspective, and shadows to ground the figure.",
};

const PLACEMENT_SELECTOR_PROMPT = `
Inspect the uploaded photograph as a scene-layout analyst. Choose exactly one placement_id for ONE ghost that would look most physically natural in this specific photo. Use only structures and empty spaces that are visibly present. Never invent a door, hallway, mirror, window, floor, furniture, or opening.

Options:
- close_subject: only when there is usable real space beside the person's face or shoulder.
- behind_furniture: when existing furniture can naturally hide and anchor part of the ghost.
- doorway_or_opening: only when an actual open doorway, hallway, or opening is clearly visible.
- reflection: only when an actual mirror, window, or reflective surface is clearly visible.
- edge_of_frame: when a real frame edge or object can naturally occlude the ghost.
- background_depth: safest fallback for visible open space that does not fit the others.

HARD RULE: If any real person, face, head, shoulder, torso, or body is visible, you MUST return close_subject. The ghost must be attached to that person's immediate personal space; do not choose a distant background, doorway, reflection, or furniture placement for a person photo. Only when no person or body is visible may you choose another option, and then only if that structure is unmistakably present. Never invent a door, hallway, mirror, window, floor, furniture, or opening. Return JSON only: {"placement_id":"one option above","reason":"short reason based only on visible features"}.
`.trim();

async function choosePlacement(image: File, apiKey: string): Promise<string> {
  const imageBase64 = Buffer.from(await image.arrayBuffer()).toString("base64");
  const imageUrl = `data:${image.type};base64,${imageBase64}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        response_format: { type: "json_object" },
        max_tokens: 160,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PLACEMENT_SELECTOR_PROMPT },
              { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
            ],
          },
        ],
      }),
    });
    if (!response.ok) return "background_depth";
    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = payload.choices?.[0]?.message?.content || "";
    const placementId = JSON.parse(content).placement_id;
    return typeof placementId === "string" && placementId in PLACEMENT_VARIATIONS ? placementId : "background_depth";
  } catch {
    return "background_depth";
  }
}

const DEFAULT_PROMPT = `
Edit the uploaded photograph, do not recreate it from scratch. Treat the original image as a locked photographic plate: preserve the real person's face, skin texture, hair, body, clothing, pose, framing, camera perspective, background, architecture, furniture, reflections, colors, exposure, white balance, shadows, lens characteristics, and natural image noise exactly as they are. Do not beautify, retouch, sharpen, repaint, redraw, replace, or reinterpret any existing part of the photo.

Add exactly one realistic but unmistakably supernatural ghost as the only meaningful visual change, following the selected composition variant. The ghost must exist as a solid three-dimensional figure physically inside the room, like a person actually standing, sitting, crouching, or leaning there when the photograph was taken. Anchor it to the scene with believable contact: feet on the floor, hips on a chair, a body behind existing furniture, or a shoulder against a doorway; include natural occlusion, cast shadow, ambient bounce light, correct perspective scale, and matching focus, motion blur, compression artifacts, and sensor grain. The ghost should feel supernatural through its pale expression, unnatural stillness, old-fashioned or slightly wrong clothing, and unsettling posture—not through transparency or special effects. It must be visible at normal viewing size and clearly feel like a ghost, not an ordinary healthy person.

When a real person is visible, keep the ghost physically close to that person above all else: immediately beside or just behind the face, shoulder, upper torso, or body silhouette, within arm's reach and on the same depth plane. In a selfie, the ghost should feel uncomfortably close to the user's face or shoulder, not like a distant figure elsewhere in the room. Preserve a natural connected head, neck, shoulders, and torso while keeping the user's face and body unchanged.

Anatomy and composition requirement: never show a floating head, detached neck, face-only peek, or a head sticking out by itself. The head must connect naturally to visible shoulders and an upper torso, or to a complete body when the placement allows it. If furniture or a wall occludes the ghost, show believable connected body parts continuing behind the occluder with natural depth and shadow. Do not crop the ghost at the neck; do not make it look like a severed mannequin or a random portrait pasted into the background.

Physical placement is mandatory: do not render the ghost as a drawing, mural, projected image, wall stain, shadow figure, reflection, hologram, smoke, fog, transparent overlay, or flat silhouette on a wall or ceiling. Do not let it float in empty space. Do not use glowing edges, neon/cyan light bars, colored beams, magical effects, or graphic horror effects. If the selected composition would place it against a wall, move it slightly forward into the room and give it visible depth, side edges, and a cast shadow. Prefer a believable position behind or beside existing furniture so the furniture visibly occludes part of the body.

Avoid all painterly, cartoon, 3D-rendered, plastic, airbrushed, poster-like, cutout, sticker-like, smoky, glowing, neon, perfectly smooth, symmetrical, or high-contrast horror effects. Do not use transparent white clothing, empty black eye sockets, exaggerated facial features, fantasy costumes, clean CGI edges, or artificial rim light. Do not alter the original subject or invent a new background. Do not turn any solid surface into glass or change the scene layout. If the selected placement would require changing an existing object, choose a nearby physically plausible location instead.

Add one very thin red four-corner detection bracket around the anomalous presence, aligned to its actual position and perspective. Keep the bracket minimal and photographic, with no full rectangle, scanning beam, glow, words, letters, labels, logos, UI, or watermark. No blood, wounds, exposed anatomy, sexualized appearance, or gore.
`.trim();

const PHOTOREALISM_RULES =
  "Photorealism and physical grounding priority: the original image must remain visually dominant and unchanged; the ghost must occupy real 3D space inside it, inherit the source camera's lighting, white balance, focus, grain, compression, perspective, occlusion, and cast shadows. The supernatural feeling must come from the physically present figure and its unsettling behavior, never from a wall drawing, projection, transparency, floating silhouette, illustration, colored beam, or standalone generated character.";

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

  if (!(image instanceof File) || !image.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일을 업로드해주세요." }, { status: 400 });
  }
  if (image.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "이미지는 10MB 이하만 사용할 수 있습니다." }, { status: 400 });
  }
  if (customPrompt.length > 1000) {
    return NextResponse.json({ error: "프롬프트는 1,000자 이하로 입력해주세요." }, { status: 400 });
  }

  // The product's core behavior is a close encounter with the uploaded person.
  // Skip the extra scene-analysis request so placement is deterministic and faster.
  const placementId = "close_subject";
  const prompt = `${customPrompt || DEFAULT_PROMPT}\n\n${PLACEMENT_VARIATIONS[placementId]}\n\n${PHOTOREALISM_RULES}`;

  const body = new FormData();
  body.append("model", "gpt-image-2");
  body.append("image", image, image.name || "ghostcam-input.png");
  body.append("prompt", prompt || DEFAULT_PROMPT);
  body.append("size", "auto");
  body.append("quality", "medium");

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
