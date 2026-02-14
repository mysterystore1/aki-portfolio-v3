'use client';

import Image from 'next/image';
import { useState } from 'react';

/** ヒーロー用プロフィール写真。public/images/hero-profile.png を優先し、無ければ hero-v2.png */
const HERO_IMAGE = '/images/hero-profile.png';
const FALLBACK_IMAGE = '/images/hero-v2.png';

export default function HeroPhoto() {
  const [src, setSrc] = useState(HERO_IMAGE);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (src === HERO_IMAGE) {
      setSrc(FALLBACK_IMAGE);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="photo-placeholder">
        <div className="icon">📸</div>
        <div className="txt">Profile Photo</div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt="Aki"
      width={320}
      height={400}
      className="photo-img"
      onError={handleError}
      priority
      sizes="(max-width: 800px) 240px, 320px"
    />
  );
}
