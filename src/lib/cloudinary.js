const CLOUDINARY_BASE = "https://res.cloudinary.com/dvsrgdyi7/image/upload";
const CLOUDINARY_VERSION = "v1780916141";
const RAW_CLOUDINARY_VERSION = "v1781762717";

/**
 * Generate a Cloudinary URL with transformations.
 *
 * Uses AVIF format with auto:good quality — best compression
 * while maintaining visually lossless quality.
 *
 * @param {string} publicId  - Cloudinary public ID (with extension if any)
 * @param {object} [options]
 * @param {string}  [options.format="avif"]  - "avif", "webp", "auto", "jpg", "png"
 * @param {string}  [options.quality="auto:good"]  - "auto:good", "auto:best", "auto:eco", 1-100
 * @param {number}  [options.width]            - Resize width in px
 * @param {number}  [options.height]           - Resize height in px
 * @param {string}  [options.crop]             - "fill", "fit", "thumb", "scale"
 * @param {string}  [options.gravity]          - "auto", "center", "face"
 * @param {number}  [options.angle]            - Rotation (e.g. -90)
 * @param {string}  [options.effect]           - Cloudinary effect (e.g. "blur:1000")
 * @param {string}  [options.version]          - Cloudinary upload version (default: CLOUDINARY_VERSION)
 * @returns {string} Full Cloudinary URL
 */
export function cloudinaryUrl(publicId, options = {}) {
  const {
    format = "avif",
    quality = "auto:good",
    width,
    height,
    crop,
    gravity,
    angle,
    effect,
    version,
  } = options;

  const params = [`f_${format}`, `q_${quality}`];

  if (effect) params.push(`e_${effect}`);
  if (angle !== undefined) params.push(`a_${angle}`);
  if (width) params.push(`w_${width}`);
  if (height) params.push(`h_${height}`);
  if (crop) params.push(`c_${crop}`);
  if (gravity) params.push(`g_${gravity}`);

  const v = version || CLOUDINARY_VERSION;
  return `${CLOUDINARY_BASE}/${params.join(",")}/${v}/${publicId}`;
}

/**
 * Generate a device-appropriate Cloudinary URL.
 * Serves AVIF with auto:good quality and automatic compression.
 *
 * @param {string} publicId
 * @param {object} [options]
 * @param {number}  [options.width]   - Image width
 * @param {string}  [options.quality="auto:good"]
 * @param {"mobile"|"desktop"} [options.browser]  - "mobile" → smaller size
 * @returns {string}
 */
export function imgUrl(publicId, options = {}) {
  const { width, quality = "auto:good", browser } = options;
  const finalWidth = width && browser === "mobile"
    ? Math.min(width, 480)
    : width;
  return cloudinaryUrl(publicId, {
    width: finalWidth,
    quality,
    crop: "fill",
    gravity: "auto",
  });
}

/**
 * Tiny blur placeholder preview (~200-500 bytes).
 * Use as low-res stand-in while the full image loads.
 *
 * @param {string} publicId
 * @returns {string}
 */
export function blurPlaceholder(publicId) {
  return cloudinaryUrl(publicId, {
    width: 20,
    quality: "auto:low",
    effect: "blur:1000",
  });
}

export const RAW_VERSION = RAW_CLOUDINARY_VERSION;

export function rawCloudinaryUrl(publicId, version) {
  const v = version || RAW_CLOUDINARY_VERSION;
  return `${CLOUDINARY_BASE}/${v}/${publicId}`;
}
