import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed top-20 right-6 z-50 animate-scale-up" role="alert" aria-live="assertive">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border ${
        type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
        type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
        'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        {type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
         type === 'error' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
         <Info className="w-5 h-5 text-blue-600" />}
        
        <span className="text-sm font-semibold">{message}</span>
        
        <button 
          onClick={onClose} 
          className="text-xs opacity-60 hover:opacity-100 font-bold ml-4 p-1 focus:outline-none"
          aria-label="Close alert notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
