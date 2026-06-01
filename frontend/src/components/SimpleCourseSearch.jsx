// frontend/src/components/SimpleCourseSearch.jsx (TEST COMPONENT)
import { useState } from 'react';
import { courseCatalog } from '../data/courseCatalog';

export default function SimpleCourseSearch({ onSelect }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.length >= 2) {
      const filtered = courseCatalog.filter(c => 
        c.courseCode.toLowerCase().includes(value.toLowerCase()) ||
        c.courseName.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
      console.log('Search results:', filtered.length);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search course (ES112, MA103, etc.)"
        className="w-full px-3 py-2 border rounded-lg"
      />
      {results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.map(course => (
            <div 
              key={course.courseCode}
              onClick={() => {
                onSelect(course);
                setSearch(course.courseCode);
                setResults([]);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="font-mono font-bold">{course.courseCode}</span>
              <span className="ml-2 text-gray-600">{course.courseName}</span>
              <span className="ml-2 text-xs text-gray-400">{course.credits} cr</span>
            </div>
          ))}
        </div>
      )}
      <div className="text-xs text-gray-400 mt-1">
        {courseCatalog.length} courses in catalog
      </div>
    </div>
  );
}
