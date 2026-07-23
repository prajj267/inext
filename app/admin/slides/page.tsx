'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch, apiFetch } from '@/lib/api';
import PhotoUploader from '@/components/PhotoUploader';

interface Slide {
  id: string;
  image: string;
  alt: string;
  order: number;
  createdAt: string;
}

export default function SlidesAdminPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Slide>>({});

  useEffect(() => {
    fetchSlides();
  }, []);

  async function fetchSlides() {
    try {
      const data = await apiFetch<Slide[]>('/api/slides');
      setSlides(data);
    } catch (error) {
      console.error('Failed to fetch slides:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this slide?')) return;
    try {
      await adminFetch(`/api/slides/${id}`, { method: 'DELETE' });
      setSlides(slides.filter((s) => s.id !== id));
    } catch {
      alert('Failed to delete slide');
    }
  }

  function startEdit(slide: Slide) {
    setEditingId(slide.id);
    setEditForm({ image: slide.image, alt: slide.alt, order: slide.order });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function saveEdit(id: string) {
    try {
      await adminFetch(`/api/slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editForm),
      });
      setSlides(slides.map(s => s.id === id ? { ...s, ...editForm } as Slide : s));
      setEditingId(null);
      setEditForm({});
    } catch {
      alert('Failed to save slide');
    }
  }

  if (loading) {
    return (
      <>
        <div className="admin-topbar"><h1>Hero Slides</h1></div>
        <div className="admin-content"><p>Loading...</p></div>
      </>
    );
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Hero Slideshow Management</h1>
        <Link href="/admin/slides/new" className="btn-new">+ Add Slide</Link>
      </div>
      <div className="admin-content">
        {slides.length === 0 ? (
          <p className="no-data">No slides yet. Add your first slide!</p>
        ) : (
          <div className="slides-grid">
            {slides.map((slide) => (
              <div key={slide.id} className="slide-card">
                {editingId === slide.id ? (
                  // Edit mode
                  <div className="slide-edit-form">
                    <div className="form-group">
                      <label>Image</label>
                      <PhotoUploader 
                        currentPhoto={editForm.image || slide.image} 
                        onUpload={(url) => setEditForm({ ...editForm, image: url })} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Alt Text</label>
                      <input 
                        type="text" 
                        value={editForm.alt || ''} 
                        onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Order</label>
                      <input 
                        type="number" 
                        value={editForm.order ?? 0} 
                        onChange={(e) => setEditForm({ ...editForm, order: Number(e.target.value) })}
                      />
                    </div>
                    <div className="slide-actions">
                      <button onClick={() => saveEdit(slide.id)} className="btn-save">Save</button>
                      <button onClick={cancelEdit} className="btn-cancel-inline">Cancel</button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <>
                    <div className="slide-preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={slide.image.startsWith('data:') ? slide.image : `/api/uploads/${slide.image}`} 
                        alt={slide.alt}
                        className="slide-preview-img"
                      />
                    </div>
                    <div className="slide-info">
                      <div className="slide-alt">{slide.alt}</div>
                      <div className="slide-order">Order: {slide.order}</div>
                    </div>
                    <div className="slide-actions">
                      <button onClick={() => startEdit(slide)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(slide.id)} className="btn-delete">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .slides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .slide-card {
          border: 1px solid var(--color-accent);
          border-radius: 4px;
          overflow: hidden;
          background: white;
        }
        .slide-preview {
          width: 100%;
          height: 200px;
          background: #f5f5f5;
          position: relative;
          overflow: hidden;
        }
        .slide-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slide-info {
          padding: 1rem;
        }
        .slide-alt {
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .slide-order {
          font-size: 0.875rem;
          color: #666;
        }
        .slide-actions {
          padding: 1rem;
          border-top: 1px solid #eee;
          display: flex;
          gap: 0.5rem;
        }
        .slide-edit-form {
          padding: 1rem;
        }
        .slide-edit-form .form-group {
          margin-bottom: 1rem;
        }
        .slide-edit-form label {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 500;
          font-size: 0.875rem;
        }
        .slide-edit-form input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .btn-edit, .btn-delete, .btn-save, .btn-cancel-inline {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 0.875rem;
        }
        .btn-edit, .btn-save {
          background: #3498db;
          color: white;
        }
        .btn-delete {
          background: #e74c3c;
          color: white;
        }
        .btn-cancel-inline {
          background: #95a5a6;
          color: white;
        }
        .btn-edit:hover, .btn-save:hover {
          background: #2980b9;
        }
        .btn-delete:hover {
          background: #c0392b;
        }
        .btn-cancel-inline:hover {
          background: #7f8c8d;
        }
      `}</style>
    </>
  );
}
