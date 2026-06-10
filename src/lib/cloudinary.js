const CLOUDINARY_BASE = "https://res.cloudinary.com/dvsrgdyi7/image/upload";
const CLOUDINARY_VERSION = "v1780916141";

/**
 * @param {string} publicId - Image public ID, e.g. "TKS05225_1_jyeotg"
 * @param {object} [options]
 * @param {string} [options.format="auto"] - "auto" (best), "webp", "avif", "jpg", "png"
 * @param {string|number} [options.quality="auto"] - "auto" (best), "best", "good", "low", ya 1-100
 * @param {number} [options.width] - Width in pixels
 * @param {number} [options.height] - Height in pixels
 * @param {string} [options.crop] - "fill", "fit", "thumb", "scale"
 * @param {string} [options.gravity] - "auto", "center", "face"
 * @returns {string} Full Cloudinary URL
 *
 * @example
 * cloudinaryUrl("TKS05225_1_jyeotg", { width: 1920 })
 *
 * @example
 * cloudinaryUrl("TKS05269_1_yvjsob.jpg", { width: 800 })
 *
 * @example
 * cloudinaryUrl("DSC04563_1_foxptm")
 */
export function cloudinaryUrl(publicId, options = {}) {
  const {
    format = "auto",
    quality = "auto",
    width,
    height,
    crop,
    gravity,
    angle,
  } = options;

  const params = [`f_${format}`, `q_${quality}`];

  if (angle !== undefined) params.push(`a_${angle}`);
  if (width) params.push(`w_${width}`);
  if (height) params.push(`h_${height}`);
  if (crop) params.push(`c_${crop}`);
  if (gravity) params.push(`g_${gravity}`);

  return `${CLOUDINARY_BASE}/${params.join(",")}/${CLOUDINARY_VERSION}/${publicId}`;
}
