import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <div className="flex items-center">
        <AlertCircle className="mr-2" size={20} />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;