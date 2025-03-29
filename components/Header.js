
import { Server } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
        <Server className="h-8 w-8 text-primary-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Simple Web Connector</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A minimalist application demonstrating frontend-backend communication with a single view
      </p>
    </header>
  );
}
