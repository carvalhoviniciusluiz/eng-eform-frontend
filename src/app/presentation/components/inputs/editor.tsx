import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function Editor({ defaultValue = '', onChange }: Props) {
  const [editorHtml, setEditorHtml] = useState<string>(defaultValue);
  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);
  const handleChange = (html: string): void => {
    setEditorHtml(html);
    onChange && onChange(html);
  };
  return <ReactQuill theme='snow' value={editorHtml} onChange={handleChange} />;
}
