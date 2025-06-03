import React from "react";
import FileUpload from "@/components/aifileanalyzer/file-upload";
// This is a page component for the AI File Analyzer feature.

// Build Your Own AI File Analyzer in 10 Minutes (Next.js 15, v0, Shadcn)
// https://www.youtube.com/watch?v=cTmgZfmoqCs
// https://github.com/TheOrcDev/ai-file-parser/tree/main/app

interface FileUploadProps {
  maxFiles: number;
  maxSize: number; // in bytes
  accept: Record<string, string[]>;
}

export default function AiFileAnalyzerPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">File Upload Demo</h1>
      <div className="max-w-xl mx-auto">
        <FileUpload
          maxFiles={5}
          maxSize={10 * 1024 * 1024} // 10MB
          accept={{
            "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            "application/pdf": [".pdf"],
            "application/msword": [".doc", ".docx"],
            "text/plain": [".txt"],
          }}
        />
      </div>
    </div>
  );
}
