'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { getImageUrl, imageFolders, type ImageStorageType } from '@/lib/image-config';

interface ImageUploadProps {
  folder: 'projecten' | 'fotoalbums' | 'bestuur' | 'nieuws';
  onUploadComplete?: (filename: string, url: string) => void;
  maxSize?: number; // MB
  accept?: string;
}

export default function ImageUploadManager({
  folder,
  onUploadComplete,
  maxSize = 5,
  accept = 'image/*',
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ filename: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Validate
    for (const file of selectedFiles) {
      if (file.size > maxSize * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: `${file.name} is too large (max ${maxSize}MB)`,
        });
        return;
      }
    }

    setFiles(selectedFiles);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const uploaded: Array<{ filename: string; url: string }> = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const { filename, url } = await response.json();
        uploaded.push({ filename, url });

        if (onUploadComplete) {
          onUploadComplete(filename, url);
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        setUploading(false);
        return;
      }
    }

    setUploadedFiles((prev) => [...prev, ...uploaded]);
    setFiles([]);
    setMessage({
      type: 'success',
      text: `Successfully uploaded ${uploaded.length} file(s)`,
    });
    setUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUploadedFile = async (filename: string) => {
    try {
      const response = await fetch('/api/admin/delete-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, folder }),
      });

      if (response.ok) {
        setUploadedFiles((prev) => prev.filter((f) => f.filename !== filename));
        setMessage({ type: 'success', text: 'File deleted' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Failed to delete: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border-2 border-dashed border-shoma-teal/30 p-8">
        <h3 className="text-xl font-bold text-shoma-slate mb-2">
          {imageFolders[folder].label}
        </h3>
        <p className="text-sm text-shoma-slate/60 mb-6">
          {imageFolders[folder].description}
        </p>

        {/* File input */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-3 bg-shoma-teal hover:bg-shoma-teal-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Select Images'}
          </button>
        </div>

        {/* Selected files preview */}
        {files.length > 0 && (
          <div className="mb-6 space-y-3">
            <h4 className="font-semibold text-shoma-slate text-sm">
              Selected: {files.length} file(s)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {files.map((file, i) => (
                <div key={i} className="relative group">
                  <div className="aspect-square bg-shoma-sand rounded-lg overflow-hidden relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-shoma-slate/60 mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Upload {files.length} File(s)
                </>
              )}
            </button>
          </div>
        )}

        {/* Messages */}
        {message && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{message.text}</p>
          </div>
        )}
      </div>

      {/* Uploaded files gallery */}
      {uploadedFiles.length > 0 && (
        <div className="bg-shoma-sand rounded-2xl p-8">
          <h4 className="font-semibold text-shoma-slate mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.filename} className="relative group">
                <div className="aspect-square bg-white rounded-lg overflow-hidden relative">
                  <Image
                    src={file.url}
                    alt={file.filename}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => removeUploadedFile(file.filename)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-shoma-slate/60 mt-2 truncate">
                  {file.filename}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
