'use client'

import { useState, useCallback } from 'react'
import { Upload, X, FileIcon, ImageIcon } from 'lucide-react'
import { Button } from './ui/button'

interface FileUploadProps {
    onFilesChange: (files: File[]) => void
    maxFiles?: number
    maxSize?: number // MB
    acceptedTypes?: string[]
}

export function FileUpload({
    onFilesChange,
    maxFiles = 5,
    maxSize = 5,
    acceptedTypes = ['image/*', 'application/pdf']
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([])
    const [dragActive, setDragActive] = useState(false)
    const [error, setError] = useState<string>('')

    const validateFile = (file: File): boolean => {
        // 파일 크기 검증
        if (file.size > maxSize * 1024 * 1024) {
            setError(`파일 크기는 ${maxSize}MB를 초과할 수 없습니다.`)
            return false
        }

        // 파일 타입 검증
        const isValidType = acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
                const category = type.split('/')[0]
                return file.type.startsWith(category + '/')
            }
            return file.type === type
        })

        if (!isValidType) {
            setError('지원하지 않는 파일 형식입니다.')
            return false
        }

        return true
    }

    const handleFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles) return

        setError('')
        const fileArray = Array.from(newFiles)

        // 최대 파일 개수 검증
        if (files.length + fileArray.length > maxFiles) {
            setError(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`)
            return
        }

        // 각 파일 검증
        const validFiles = fileArray.filter(validateFile)

        if (validFiles.length > 0) {
            const updatedFiles = [...files, ...validFiles]
            setFiles(updatedFiles)
            onFilesChange(updatedFiles)
        }
    }, [files, maxFiles, onFilesChange])

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index)
        setFiles(updatedFiles)
        onFilesChange(updatedFiles)
        setError('')
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        handleFiles(e.dataTransfer.files)
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) {
            return <ImageIcon className="w-8 h-8 text-purple-400" />
        }
        return <FileIcon className="w-8 h-8 text-blue-400" />
    }

    return (
        <div className="space-y-4">
            {/* 드래그 앤 드롭 영역 */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-purple-500/50 bg-gray-900/50'
                    }`}
            >
                <input
                    type="file"
                    multiple
                    accept={acceptedTypes.join(',')}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={files.length >= maxFiles}
                />

                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold text-white mb-2">
                    파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-sm text-gray-400">
                    최대 {maxFiles}개, 파일당 {maxSize}MB 이하
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    지원 형식: 이미지, PDF
                </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {/* 업로드된 파일 목록 */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">
                        업로드된 파일 ({files.length}/{maxFiles})
                    </h4>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg group hover:border-purple-500/50 transition-all"
                            >
                                {getFileIcon(file)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
