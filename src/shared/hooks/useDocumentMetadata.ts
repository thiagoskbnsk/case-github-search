import { useEffect, useRef } from 'react'

interface DocumentMetadata {
  title?: string
  description?: string
  // Future: ogTitle, ogImage, etc.
}

/**
 * Custom hook to set document metadata (title, description, etc.)
 * Optimized to prevent unnecessary rerenders by checking if values actually changed
 * @param metadata - The metadata to set for the document
 */
export const useDocumentMetadata = (metadata: DocumentMetadata) => {
  const prevMetadataRef = useRef<DocumentMetadata>({})

  useEffect(() => {
    const { title, description } = metadata

    // Only update title if it changed
    if (title && title !== prevMetadataRef.current.title) {
      document.title = title
      prevMetadataRef.current.title = title
    }

    // Only update description if it changed
    if (description && description !== prevMetadataRef.current.description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
      prevMetadataRef.current.description = description
    }
  }, [metadata])
}
