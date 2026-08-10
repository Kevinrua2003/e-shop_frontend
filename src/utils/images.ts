import { API_URL } from './api';

export const PRODUCT_PLACEHOLDER = '/product-placeholder.svg';

/**
 * Resuelve la imagen de un producto a una URL utilizable por <Image>.
 *
 * - Ruta relativa (`/product/:id/image`) -> `${API_URL}${image}`
 * - URL completa (legado) -> tal cual
 * - null / vacío -> placeholder genérico
 */
export function resolveProductImage(
  image: string | null | undefined,
): string {
  if (!image) {
    return PRODUCT_PLACEHOLDER;
  }
  if (image.startsWith('http')) {
    return image;
  }
  return `${API_URL}${image}`;
}
