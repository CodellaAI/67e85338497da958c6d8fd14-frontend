
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Transition } from '@headlessui/react';

export default function DataCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-medium text-lg text-gray-900">{item.title || 'Item'}</h3>
          <p className="text-gray-500 text-sm">{item.description?.substring(0, 60) || 'No description available'}{item.description?.length > 60 ? '...' : ''}</p>
        </div>
        <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <Transition
        show={isExpanded}
        enter="transition-all duration-200 ease-out"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-96"
        leave="transition-all duration-150 ease-in"
        leaveFrom="opacity-100 max-h-96"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(item).map(([key, value]) => {
              // Skip _id and __v fields or any fields already shown
              if (key === '_id' || key === '__v' || key === 'title' || key === 'description') return null;
              
              return (
                <div key={key} className="text-sm">
                  <span className="block text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium text-gray-800">{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</span>
                </div>
              );
            })}
          </div>
          
          {item._id && (
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
              ID: {item._id}
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
}
