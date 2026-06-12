import { useEffect, useRef } from 'react';
import { cloudinaryUrl, blurPlaceholder } from '../../lib/cloudinary';

/**
 * Reusable Cloudinary image with AVIF format, auto:good quality,
 * blur placeholder, progressive reveal, and error recovery.
 *
 * Accepts any `<img>` attribute via `imgProps` so that callers can
 * pass `fetchpriority`, `loading`, `decoding`, `onLoad`, etc.
 *
 * @param {object}   props
 * @param {string}   props.publicId     - Cloudinary public ID
 * @param {string}   props.alt          - Alt text (required)
 * @param {number}   [props.width]      - Image width in px
 * @param {object}   [props.options]    - Extra cloudinaryUrl options (crop, gravity, angle, …)
 * @param {string}   [props.wrapperClassName]  - Classes for the placeholder wrapper div
 * @param {string}   [props.imgClassName]      - Classes for the <img> element
 * @param {import('react').RefObject} [props.imgRef]  - External ref for animations (GSAP, etc.)
 * @param {object}   [props.imgProps]   - Any extra <img> attributes
 */
export default function CldImage({
  publicId,
  alt,
  width,
  options = {},
  wrapperClassName = '',
  imgClassName = '',
  imgRef: externalImgRef,
  ...imgProps
}) {
  const internalImgRef = useRef(null);
  const wrapRef = useRef(null);
  const imgEl = externalImgRef || internalImgRef;

  const src = cloudinaryUrl(publicId, { width, ...options });
  const placeholderUrl = blurPlaceholder(publicId);

  useEffect(() => {
    const img = imgEl.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;

    const reveal = () => {
      img.classList.add('loaded');
      wrap.style.backgroundImage = 'none';
    };

    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    }
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className={`progressive-bg ${wrapperClassName}`}
      style={{
        backgroundImage: `url(${placeholderUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        ref={imgEl}
        src={src}
        alt={alt}
        className={`progressive-load ${imgClassName}`}
        {...imgProps}
      />
    </div>
  );
}
