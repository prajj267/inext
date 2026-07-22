'use client';

import { useRef, useState } from 'react';
import { API_URL, getToken } from '@/lib/api';

interface Props {
  currentPhoto?: string;
  onUpload: (url: string) => void; // callback instead of hidden input — works with client forms
}

export default function PhotoUploader({ currentPhoto, onUpload }: Props) {
  const [preview,  setPreview]  = useState<string>(currentPhoto ?? '');
  const [status,   setStatus]   = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [error,    setError]    = useState('');
  const [manualUrl, setManualUrl] = useState(currentPhoto ?? '');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setStatus('uploading');
    setError('');

    try {
      const formData = new FormData();
      formData.append('photo', file);
      const token = getToken();
      const res = await fetch(`${API_URL}/api/members/upload-photo`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { path } = await res.json();
      const fullUrl = `${API_URL}${path}`;
      setManualUrl(fullUrl);
      onUpload(fullUrl);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError('Upload failed. Try pasting the URL manually.');
    }
  }

  function handleManualChange(e: React.ChangeEvent<HTMLInputElement>) {
    setManualUrl(e.target.value);
    setPreview(e.target.value);
    onUpload(e.target.value);
  }

  return (
    <div className="photo-uploader">
      {preview && (
        <div className="photo-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Member photo preview" className="photo-preview-img" />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="button" className="btn-cancel"
          onClick={() => fileRef.current?.click()} disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Uploading…' : preview ? 'Change Photo' : 'Upload Photo'}
        </button>
        {status === 'done'  && <span style={{ fontSize: '0.8rem', color: '#1a6630' }}>✓ Uploaded</span>}
        {status === 'error' && <span style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</span>}
      </div>

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
        onChange={handleFile} style={{ display: 'none' }} />

      <div style={{ marginTop: '0.5rem' }}>
        <input type="text" placeholder="or paste a URL / path manually"
          value={manualUrl} onChange={handleManualChange}
          style={{ width: '100%', fontSize: '0.8rem', padding: '0.3rem 0.5rem',
            border: '1px solid var(--color-accent)', borderRadius: '3px' }} />
      </div>
    </div>
  );
}
