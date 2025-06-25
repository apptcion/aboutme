import { useTexture, useGLTF } from '@react-three/drei';
import { pages } from './UI';

pages.forEach(p => {
  p.front.image?.forEach(i => useTexture.preload(`/books/${i.name}`));
  p.back .image?.forEach(i => useTexture.preload(`/books/${i.name}`));
});