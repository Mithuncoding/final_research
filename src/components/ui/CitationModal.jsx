import { useState } from 'react';
import { Copy, Check, Quote, X } from 'lucide-react';
import { Button } from './Button';
import { toast } from './Toaster';

export default function CitationModal({ analysis, isOpen, onClose }) {
  const [copiedFormat, setCopiedFormat] = useState(null);

  const title = analysis.title || 'Untitled Research Paper';
  const author = analysis.authors?.join(', ') || 'Unknown Author';
  const year = analysis.publicationDate ? new Date(analysis.publicationDate).getFullYear() : 'n.d.';
  const url = window.location.href;
  const today = new Date().toLocaleDateString();

  const citations = {
    APA: `${author}. (${year}). ${title}. Retrieved from ${url}`,
    MLA: `${author}. "${title}." ${year}. Web. ${today}.`,
    Chicago: `${author}. "${title}." ${year}. Accessed ${today}. ${url}.`,
    BibTeX: `@article{citation,
  title={${title}},
  author={${author}},
  year={${year}},
  note={Retrieved from ${url}}
}`
  };

  const handleCopy = (format) => {
    navigator.clipboard.writeText(citations[format]);
    setCopiedFormat(format);
    toast.success(`Copied ${format} citation!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-prism-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Quote className="w-5 h-5" />
            <h2 className="text-xl font-bold">Generate Citation</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-800 text-sm">
            <span className="font-semibold">Note:</span> Verify all citations for accuracy before use.
          </div>

          <div className="space-y-4">
            {Object.entries(citations).map(([format, text]) => (
              <div key={format} className="border border-slate-200 rounded-xl p-4 hover:border-prism-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-700">{format}</h3>
                  <Button
                    size="sm"
                    variant={copiedFormat === format ? 'success' : 'outline'}
                    onClick={() => handleCopy(format)}
                    className={copiedFormat === format ? 'bg-green-100 text-green-700 border-green-200' : ''}
                  >
                    {copiedFormat === format ? (
                      <>
                        <Check className="w-4 h-4 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 overflow-x-auto whitespace-pre-wrap font-mono">
                  {text}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}
