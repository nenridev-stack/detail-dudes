'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springConfig } from '@/lib/motion-config';

// ============================================================
// Types
// ============================================================

interface PhotosStepProps {
  photos: File[];
  photosPreviews: string[];
  onAddPhoto: (file: File) => void;
  onRemovePhoto: (index: number) => void;
  onNext: () => void;
  onSkip: () => void;
}

// ============================================================
// Constants
// ============================================================

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PHOTOS = 5;

// ============================================================
// Validation Helper
// ============================================================

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'File type not supported. Only JPEG, PNG, and WebP allowed.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File too large. Maximum size is 5MB.';
  }
  return null;
}

// ============================================================
// Animation Variants
// ============================================================

const previewItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: springConfig.gentle },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

// ============================================================
// PhotosStep Component
// ============================================================

export default function PhotosStep({
  photos,
  photosPreviews,
  onAddPhoto,
  onRemovePhoto,
  onNext,
  onSkip,
}: PhotosStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddMore = photos.length < MAX_PHOTOS;

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (photos.length >= MAX_PHOTOS) {
          setError(`Maximum ${MAX_PHOTOS} photos allowed.`);
          break;
        }

        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        onAddPhoto(file);
      }
    },
    [photos.length, onAddPhoto]
  );

  // ---- Drag events ----
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  // ---- File input change ----
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
      // Reset input so the same file can be selected again
      e.target.value = '';
    },
    [processFiles]
  );

  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex flex-col items-center w-full py-8">
      <h2 className="text-2xl font-display font-bold mb-2 text-center text-white">
        Upload Condition Photos
      </h2>
      <p className="text-gray-400 text-center mb-6 max-w-md">
        Help us assess your vehicle&apos;s condition. Upload up to {MAX_PHOTOS} photos
        (optional).
      </p>

      {/* Drag-and-drop zone */}
      {canAddMore && (
        <motion.div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickUpload}
          animate={{
            scale: isDragging ? 1.02 : 1,
          }}
          transition={springConfig.gentle}
          className={`
            w-full max-w-lg cursor-pointer rounded-xl border-2 border-dashed p-8
            flex flex-col items-center justify-center gap-3 text-center
            transition-colors duration-200
            ${isDragging ? 'bg-accent-500/5 border-accent-500' : 'bg-white/5 border-white/10 hover:border-accent-500/50 hover:bg-white/5'}
          `}
          role="button"
          tabIndex={0}
          aria-label="Drop photos here or click to upload"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClickUpload();
            }
          }}
        >
          {/* Upload icon */}
          <svg
            className="w-10 h-10 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          <span className="text-sm font-medium text-white">
            {isDragging ? 'Drop your photos here' : 'Drag & drop photos here'}
          </span>
          <span className="text-xs text-gray-500">
            or click to browse • JPEG, PNG, WebP • Max 5MB each
          </span>
          <span className="text-xs text-gray-500">
            {photos.length}/{MAX_PHOTOS} photos uploaded
          </span>
        </motion.div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 text-sm text-red-400 font-medium text-center"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Photo preview grid */}
      {photosPreviews.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence>
              {photosPreviews.map((preview, index) => (
                <motion.div
                  key={preview}
                  variants={previewItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="relative aspect-square rounded-lg overflow-hidden group border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Vehicle photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Remove button overlay */}
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(index)}
                    className="
                      absolute top-1.5 right-1.5 w-7 h-7 rounded-full
                      bg-black/60 text-white flex items-center justify-center
                      opacity-0 group-hover:opacity-100 focus:opacity-100
                      transition-opacity duration-150
                      min-w-[44px] min-h-[44px] -mt-2 -mr-2 p-2
                    "
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Max photos reached message */}
      {!canAddMore && (
        <p className="mt-4 text-sm text-gray-400 text-center">
          Maximum {MAX_PHOTOS} photos reached.
        </p>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-lg">
        <button
          type="button"
          onClick={onNext}
          disabled={photos.length === 0}
          className={`
            flex-1 px-6 py-3 rounded-lg text-sm font-medium min-h-[44px]
            transition-colors duration-200
            ${
              photos.length > 0
                ? 'bg-accent-500 text-white hover:bg-accent-600'
                : 'bg-white/10 text-gray-600 cursor-not-allowed'
            }
          `}
        >
          Continue with {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="
            flex-1 px-6 py-3 rounded-lg border border-white/10 text-white text-sm font-medium
            hover:bg-white/5 transition-colors duration-200 min-h-[44px]
          "
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}
