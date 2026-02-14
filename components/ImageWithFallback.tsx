'use client';

import Image from 'next/image';
import { useState } from 'react';
import ImageFallback from '@/components/ImageFallback';
import { cn } from '@/lib/utils';

export default function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  fallbackSubLabel,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  loading
}: {
  src?: string;
  alt: string;
  fallbackLabel: string;
  fallbackSubLabel?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <ImageFallback
        label={fallbackLabel}
        subLabel={fallbackSubLabel}
        className={cn('absolute inset-0', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      className={cn('object-cover', imageClassName)}
      onError={() => setHasError(true)}
    />
  );
}
