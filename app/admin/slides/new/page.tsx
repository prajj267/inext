'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';

export default function NewSlidePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    image: '',
    alt: 'Lab slide',
    order: 0,
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image) {
      setError('Please upload an image');
      return;
    }
    setError('');
    try {
      await adminFetch('/api/slides', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      router.push('/admin/slides');
    } catch {
      setError('Failed to create slide. Please try again.');
    }
  }

  return (
    <>
      <div className="admin-topbar"><h1>Add New Slide</h1></div>
      <div className="admin-content">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Slide Image *</label>
            <PhotoUploader 
              currentPhoto={form.image} 
              onUpload={(url) => setForm({ ...form, image: url })} 
            />
            <small>Upload an image for the hero slideshow (recommended: 800x600px or similar 4:3 ratio)</small>
          </div>

          <div className="form-group">
            <label>Alt Text</label>
            <input 
              type="text" 
              value={form.alt} 
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              placeholder="Brief description for accessibility"
              required
            />
          </div>

          <div className="form-group">
            <label>Display Order</label>
            <input 
              type="number" 
              value={form.order} 
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              min="0"
            />
            <small>Lower numbers appear first in the slideshow</small>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">Create Slide</button>
            <a href="/admin/slides" className="btn-cancel">Cancel</a>
          </div>
        </form>
      </div>
    </>
  );
}
