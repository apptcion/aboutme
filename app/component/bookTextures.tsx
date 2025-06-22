import { useTexture } from "@react-three/drei";
import createTexture from "../util/createTexture";
import { useMemo } from "react";
import { SRGBColorSpace, Texture } from "three";
import { Image } from "./UI";

export interface Text{
    text: string;
    color: string;
    font: string;
    x: number,
    y: number;
    size: number;
    weight: number;
}

interface PageData {
    front: {
        image: Array<Image> | null,
        lines: Array<Text> | null
    }, 
    back: {
        image: Array<Image> | null,
        lines: Array<Text> | null
    }
}

interface ImageData {
    source: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
}

export function useBookTextures(pages: PageData[]) {
  return useMemo(() => {
    return pages.map(({ front, back }) => {
        const frontUrls = front.image?.map(i => `/books/${i.name}`) ?? [];
        const backUrls  = back.image?.map(i => `/books/${i.name}`) ?? [];

        const frontTexArr = useTexture(frontUrls);
        const backTexArr  = useTexture(backUrls);

        [...frontTexArr, ...backTexArr].forEach(t => {
          if (t) t.colorSpace = SRGBColorSpace;
        });
        const texFront = createTexture(front.lines, toImageData(frontTexArr));
        const texBack  = createTexture(back.lines, toImageData(backTexArr));

        texFront.colorSpace = texBack.colorSpace = SRGBColorSpace;

        return [texFront, texBack] as const;
    });
  }, [pages]);
}

function toImageData(texArr: Texture[]):ImageData[] {
  return texArr.map((img, i) => ({
    source: img.image as CanvasImageSource,
    x:      img.image.x / 100,
    y:      img.image.y / 100,
    width:  img.width  / 100,
    height: img.height / 100
  })) ?? [];
}