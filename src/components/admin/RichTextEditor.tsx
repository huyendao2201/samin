'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Đang tải trình soạn thảo...</div>
});

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:border-b-slate-200 [&_.ql-toolbar]:bg-slate-50 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:text-slate-700 border border-slate-200">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        formats={formats}
        placeholder="Soạn thảo nội dung ở đây..."
      />
    </div>
  );
}
