import { CanvasTexture, SRGBColorSpace } from "three";

interface Text{
    text: string;
    color: string;
    font: string;
    x: number,
    y: number;
    size: number;
    weight: number;
}
interface ImageData {
    source: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
}

export default function createTexture(
  lines:  Text[] | null,
  images: ImageData[] | null,          // 그림이 없어도 빈 배열
  options?: { bgColor?: string } // 배경색 커스터마이즈
): CanvasTexture {
  const canvas  = document.createElement("canvas");
  canvas.width  = 1280;
  canvas.height = 1710;
  const ctx = canvas.getContext("2d")!;

  /* 1) 배경 ----------------------------------------------------------------*/
  ctx.fillStyle = options?.bgColor ?? "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* 2) 이미지 --------------------------------------------------------------*/

  images?.forEach(img => {
        ctx.drawImage(
      img.source,
      img.x * canvas.width,
      img.y * canvas.height,
      img.width  * canvas.width,
      img.height * canvas.height
    );
  });

  /* 3) 텍스트 --------------------------------------------------------------*/
lines?.forEach(line => {
  ctx.fillStyle = line.color;
  ctx.font      = line.font || `${line.weight} ${line.size}px sans-serif`;
  ctx.textBaseline = "top";

  // ① 줄바꿈 기준으로 자르기
  const rows = line.text.split(/\r?\n/);         // CRLF·LF 모두 대응

  // ② 한 줄씩 그리기
  rows.forEach((row, i) => {
    ctx.fillText(
      row,
      (line.x / 100) * canvas.width,
      (line.y / 100) * canvas.height + i * line.size * 1.2  // line‑height 1.2배 예시
    );
  });
});

  /* 4) Three.js Texture ----------------------------------------------------*/
  const tex = new CanvasTexture(canvas);
  tex.colorSpace  = SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}