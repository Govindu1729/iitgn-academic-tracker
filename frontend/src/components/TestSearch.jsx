import { useState } from 'react';
import { courseCatalog } from '../data/courseCatalog';

export default function TestSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.length >= 2) {
      const filtered = courseCatalog.filter(c => 
        c.courseCode.toLowerCase().includes(value.toLowerCase()) ||
        c.courseName.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      console.log('Found:', filtered.length, 'courses for', value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm text-gray-600 mb-2">Total courses in catalog: {courseCatalog.length}</p>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Type 'CS' or 'ES' to test..."
        className="w-full px-3 py-2 border rounded-lg"
      />
      {results.length > 0 && (
        <div className="mt-2 border rounded-lg max-h-40 overflow-auto">
          {results.map(c => (
            <div key={c.courseCode} className="p-2 border-b">
              <span className="font-mono font-bold">{c.courseCode}</span>
              <span className="ml-2">{c.courseName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
