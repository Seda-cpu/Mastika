"use client";

import { Camera, CalendarDays, FileImage, X } from "lucide-react";
import { FormEvent, useState } from "react";
import type { CompletionDraft, Peak } from "@/types/domain";

interface PeakFormModalProps {
  peak: Peak;
  onClose: () => void;
  onSubmit: (draft: CompletionDraft) => void;
}

export function PeakFormModal({ peak, onClose, onSubmit }: PeakFormModalProps) {
  const [completedAt, setCompletedAt] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();

  function handleImage(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(typeof reader.result === "string" ? reader.result : undefined);
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ peakId: peak.id, completedAt, note, photoDataUrl });
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="sheet form-sheet" onSubmit={handleSubmit}>
        <button type="button" className="icon-button sheet-close" onClick={onClose} aria-label="Kapat">
          <X size={20} />
        </button>
        <div className="sheet-heading">
          <span className="eyebrow">kanıt ekle</span>
          <h2>{peak.name}</h2>
          <p>Zirveyi atlasında açmak için fotoğraf, tarih ve kısa bir not bırak.</p>
        </div>

        <label className={photoDataUrl ? "photo-picker has-photo" : "photo-picker"}>
          {photoDataUrl ? <img src={photoDataUrl} alt="Yuklenen zirve onizleme" /> : <FileImage size={34} />}
          <span>
            <Camera size={16} />
            Fotoğraf seç
          </span>
          <input type="file" accept="image/*" onChange={(event) => handleImage(event.target.files?.[0])} />
        </label>

        <label className="field-label">
          <span>
            <CalendarDays size={15} />
            Tarih
          </span>
          <input type="date" value={completedAt} onChange={(event) => setCompletedAt(event.target.value)} required />
        </label>

        <label className="field-label">
          <span>Not</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Zirvede ne hissettin?" rows={4} />
        </label>

        <button className="primary-action wide" type="submit">
          Scratch ile Aç
        </button>
      </form>
    </div>
  );
}
