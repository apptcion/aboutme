import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import {
  CanvasTexture,
  SRGBColorSpace,
  Texture,
} from "three";
import createTexture from "../util/createTexture";

export interface Image {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Text {
  text: string;
  color: string;
  font: string;
  x: number;
  y: number;
  size: number;
  weight: number;
}

interface PageSide {
  image: Image[] | null;
  lines: Text[] | null;
}

interface PageData {
  front: PageSide;
  back: PageSide;
}

interface ImageData {
  source: CanvasImageSource;
  x: number;
  y: number;
  width: number;
  height: number;
}

type PageTexture = [CanvasTexture, CanvasTexture]; // [앞, 뒤]

export function useBookTextures(pages: PageData[]): PageTexture[] {
  const { allUrls, sliceInfo } = useMemo(() => {
    const urls: string[] = [];
    const info: { frontCnt: number; backCnt: number }[] = [];

    pages.forEach(({ front, back }) => {
      const f = front.image?.map((i) => `/books/${i.name}`) ?? [];
      const b = back.image?.map((i) => `/books/${i.name}`) ?? [];
      info.push({ frontCnt: f.length, backCnt: b.length });
      urls.push(...f, ...b);
    });

    return { allUrls: urls, sliceInfo: info };
  }, [pages]);

  const loaded = useTexture(allUrls);

  return useMemo<PageTexture[]>(() => {
    let offset = 0;

    return pages.map(({ front, back }, idx) => {
      const { frontCnt, backCnt } = sliceInfo[idx];

      const frontTexArr = loaded.slice(offset, offset + frontCnt);
      const backTexArr = loaded.slice(
        offset + frontCnt,
        offset + frontCnt + backCnt
      );
      offset += frontCnt + backCnt;

      [...frontTexArr, ...backTexArr].forEach(
        (t) => (t.colorSpace = SRGBColorSpace)
      );

      const texFront = createTexture(
        front.lines,
        toImageData(front, frontTexArr)
      );
      const texBack = createTexture(
        back.lines,
        toImageData(back, backTexArr)
      );
      texFront.colorSpace = texBack.colorSpace = SRGBColorSpace;

      return [texFront, texBack] as PageTexture;
    });
  }, [loaded, pages, sliceInfo]);
}

/* ────────────────────── 보조: Canvas → ImageData ───────────────────── */
function toImageData(
  side: PageSide,
  texArr: Texture[]
): ImageData[] {
  if (!side.image) return [];
  return side.image.map((meta, i) => ({
    source: texArr[i]?.image as CanvasImageSource,
    x: meta.x / 100,
    y: meta.y / 100,
    width: meta.width / 100,
    height: meta.height / 100,
  }));
}
