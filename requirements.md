## Packages
react-pdf | Renders PDF files page by page for the reader interface
pdfjs-dist | Required worker dependency for react-pdf
framer-motion | Smooth page transitions and fluid animations

## Notes
- PDF files are assumed to be accessible via `/uploads/${document.filename}` after uploading.
- The upload endpoint `POST /api/documents/upload` expects a `FormData` object with a `file` field.
