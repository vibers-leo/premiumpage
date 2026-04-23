'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Paperclip } from 'lucide-react'

interface Props {
  onUpload: (url: string, filename: string) => void
  compact?: boolean
}

export function PortalFileUpload({ onUpload, compact }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    try {
      // 1. presigned URL 발급
      const presignRes = await fetch('/api/storage/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          folder: 'portal-attachments',
        }),
      })
      const { uploadUrl, publicUrl } = await presignRes.json()
      if (!uploadUrl) throw new Error('URL 발급 실패')

      // 2. 파일 업로드
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      onUpload(publicUrl, file.name)
    } catch (e) {
      alert('파일 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  if (compact) {
    return (
      <>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-10 px-3 border border-neutral-200 text-neutral-500 hover:border-neutral-400 transition-colors flex items-center gap-1.5 text-sm disabled:opacity-50"
          title="파일 첨부"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
        </button>
      </>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full h-20 border-2 border-dashed border-neutral-200 hover:border-neutral-400 transition-colors flex flex-col items-center justify-center gap-1 text-neutral-400 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Upload className="w-5 h-5" />
            <span className="text-xs font-medium">파일 첨부 (이미지, PDF, 문서)</span>
          </>
        )}
      </button>
    </div>
  )
}

export function AttachmentList({ urls, onRemove }: { urls: string[]; onRemove?: (i: number) => void }) {
  if (!urls.length) return null
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {urls.map((url, i) => {
        const name = decodeURIComponent(url.split('/').pop() || '파일')
        return (
          <div key={i} className="flex items-center gap-1.5 text-xs bg-neutral-100 px-3 py-1.5 border border-neutral-200">
            <Paperclip className="w-3 h-3 text-neutral-400" />
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 max-w-[200px] truncate">
              {name}
            </a>
            {onRemove && (
              <button onClick={() => onRemove(i)} className="text-neutral-400 hover:text-red-500 ml-1">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
