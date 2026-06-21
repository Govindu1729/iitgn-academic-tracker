// frontend/src/components/CourseSearchInput.jsx
import { useState, useEffect, useRef } from 'react';

// Full course catalog - MOVED OUTSIDE COMPONENT (this is correct)
const COURSE_CATALOG = [
  // First Year Institute Core
  { courseCode: 'FP100', courseName: 'Foundation Programme', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES101', courseName: 'Engineering Graphics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES112', courseName: 'Computing', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES115', courseName: 'Design, Innovation and Prototyping', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES119', courseName: 'Principles of Artificial Intelligence', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'MA103', courseName: 'Calculus of Single Variable and Linear Algebra', credits: 4, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'HS191', courseName: 'Introduction to Writing I', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS192', courseName: 'Introduction to Writing II', credits: 2, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'BS192', courseName: 'Undergraduate Science Laboratory', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'PE101', courseName: 'Physical Education', credits: 0, basketType: 'Institute Core', department: 'Institute' },
  
  // Second Year
  { courseCode: 'ES113', courseName: 'Data-Centric Computing', credits: 3, basketType: 'Institute Core', department: 'Institute', applicableBatches: ['2022-23', '2023-24', '2024-25'] },
  { courseCode: 'ES114', courseName: 'Probability, Statistics and Data Visualization', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES116', courseName: 'Principles and Applications of Electrical Engineering', credits: 5, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES117', courseName: 'The World of Engineering', credits: 2, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES118', courseName: 'Materials for the Future', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
  { courseCode: 'GE101', courseName: 'General Education I', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'GE201', courseName: 'General Education II', credits: 2, basketType: 'General Education', department: 'Institute' },
  { courseCode: 'MA104', courseName: 'Ordinary Differential Equations', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA203', courseName: 'Numerical Methods', credits: 2, basketType: 'Institute Core', department: 'Maths' },
  { courseCode: 'MA205', courseName: 'Calculus of Several Variables', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'MA206', courseName: 'Introduction to Complex Analysis', credits: 2, basketType: 'Mathematics Basket', department: 'Maths' },
  { courseCode: 'ES211', courseName: 'Thermodynamics', credits: 3, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES214', courseName: 'Discrete Mathematics', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES221', courseName: 'Mechanics of Solids', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES242', courseName: 'Data Structures and Algorithms I', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES243', courseName: 'Biology for Engineers', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES244', courseName: 'Signals, Systems and Random Processes', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES245', courseName: 'Control Systems', credits: 4, basketType: 'Institute Core', department: 'Institute' },
  { courseCode: 'ES301', courseName: 'Data Structures and Algorithms II', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  { courseCode: 'ES336', courseName: 'Computer Organization and Architecture', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  
  // HSS Courses
  { courseCode: 'HS151', courseName: 'Economics', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS221', courseName: 'Introduction to Philosophy', credits: 4, basketType: 'HSS', department: 'HSS' },
  { courseCode: 'HS201', courseName: 'World Civilizations and Cultures', credits: 4, basketType: 'HSS', department: 'HSS' },
  
  // Science Basket
  { courseCode: 'PH201', courseName: 'Introduction to Electrodynamics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH202', courseName: 'Introduction to Quantum Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  { courseCode: 'PH203', courseName: 'Solid State Physics', credits: 4, basketType: 'Science Basket', department: 'Physics' },
  
  // CSE Courses
  { courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS202', courseName: 'Software Tools and Techniques for CSE', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS203', courseName: 'Software Tools and Techniques for AI', credits: 4, basketType: 'Discipline Core', department: 'AI' },
  { courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS329', courseName: 'Foundations of AI: Multiagent Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, basketType: 'Discipline Core', department: 'CSE' },
  { courseCode: 'CS432', courseName: 'Databases', credits: 4, basketType: 'Discipline Elective', department: 'CSE' },
  
  // EE Courses (Updated: EE 341 replaces EE 313 for 2025-26)
  { courseCode: 'EE221', courseName: 'Electronic Devices', credits: 3, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE223', courseName: 'Electrical Machines', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE224', courseName: 'Power Systems', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE226', courseName: 'Semiconductor Devices', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE312', courseName: 'Engineering Electromagnetics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE322', courseName: 'Analog and Mixed Signal Circuits', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE323', courseName: 'Digital Signal Processing', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE333', courseName: 'Power Electronics', credits: 4, basketType: 'Discipline Core', department: 'EE' },
  { courseCode: 'EE313', courseName: 'Communication Systems', credits: 3, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2022-23', '2023-24', '2024-25'] },
  { courseCode: 'EE341', courseName: 'Communication Systems', credits: 4, basketType: 'Discipline Core', department: 'EE', applicableBatches: ['2025-26', '2026-27', '2027-28'] },
  
  // ME Courses
  { courseCode: 'ME206', courseName: 'Statics and Dynamics', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME207', courseName: 'Fluid Dynamics', credits: 5, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME208', courseName: 'Vibrations', credits: 2, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME209', courseName: 'Principles of Manufacturing Processes', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME333', courseName: 'Mechanics of Materials', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME334', courseName: 'Heat and Mass Transfer', credits: 4, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME335', courseName: 'Synthesis and Analysis of Mechanisms', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME337', courseName: 'Mechanical Systems Design', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  { courseCode: 'ME362', courseName: 'Introduction to Manufacturing Systems and Metrology', credits: 3, basketType: 'Discipline Core', department: 'ME' },
  
  // ChemE Courses
  { courseCode: 'CL201', courseName: 'Chemical Process Calculations', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL202', courseName: 'Chemical Engineering Thermodynamics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL203', courseName: 'Process Fluid Mechanics', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL204', courseName: 'Heat Transfer', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL205', courseName: 'Chemical Reaction Engineering I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL313', courseName: 'Chemical Reaction Engineering II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL314', courseName: 'Separation Processes I', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL315', courseName: 'Process Dynamics and Control', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL316', courseName: 'Separation Processes II', credits: 3, basketType: 'Discipline Core', department: 'ChemE' },
  { courseCode: 'CL317', courseName: 'Process Synthesis, Design and Simulation', credits: 4, basketType: 'Discipline Core', department: 'ChemE' },
  
  // Civil Courses
  { courseCode: 'CE201', courseName: 'Earth Materials and Processes', credits: 2, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE202', courseName: 'Sustainability and Environment', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE203', courseName: 'Geospatial Engineering', credits: 3, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE301', courseName: 'Soil Mechanics', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE302', courseName: 'Structural Analysis', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE310', courseName: 'Hydrology and Hydraulics', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE311', courseName: 'Design of Reinforced Concrete Structures', credits: 5, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE312', courseName: 'Design of Steel Structures', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE403', courseName: 'Construction Technology and Management', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  { courseCode: 'CE404', courseName: 'Transportation Engineering', credits: 4, basketType: 'Discipline Core', department: 'Civil' },
  
  // MSE Courses
  { courseCode: 'MSE202', courseName: 'Materials Thermodynamics', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE204', courseName: 'Transport Phenomena in Materials Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE205', courseName: 'Mechanical Behaviour of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE206', courseName: 'Physics of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE207', courseName: 'Structure of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE210', courseName: 'Microstructural Engineering', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE302', courseName: 'Corrosion and Degradation of Materials', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE304', courseName: 'Principles of Metal Extraction and Refining', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE307', courseName: 'Materials Processing', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE313', courseName: 'Polymers, Ceramics and Composites', credits: 4, basketType: 'Discipline Core', department: 'MSE' },
  { courseCode: 'MSE314', courseName: 'Materials Selection and Design', credits: 3, basketType: 'Materials Basket', department: 'MSE' },
];

// Helper function to get applicable courses based on admission year
export const getApplicableCourses = (admissionYear) => {
  if (!admissionYear) return COURSE_CATALOG;
  
  const yearRange = `${admissionYear}-${String(Number(admissionYear) + 1).slice(-2)}`;
  
  return COURSE_CATALOG.filter(course => {
    // If no batch restriction, show for all
    if (!course.applicableBatches) return true;
    // Check if course is applicable for this batch
    return course.applicableBatches.includes(yearRange);
  });
};

export default function CourseSearchInput({ 
  value, 
  onChange, 
  onSelect, 
  placeholder = "Search course...", 
  className = "",
  admissionYear = null // Pass admission year from parent
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Get applicable courses based on admission year
  const applicableCourses = getApplicableCourses(admissionYear);

  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const searchTerm = value.toLowerCase();
    const filtered = applicableCourses.filter(course => 
      course.courseCode.toLowerCase().includes(searchTerm) ||
      course.courseName.toLowerCase().includes(searchTerm)
    ).slice(0, 8);
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [value, applicableCourses]);

  const handleSelect = (course) => {
    onChange(course.courseCode);
    if (onSelect) {
      onSelect(course);
    }
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef} 
          className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((course, idx) => (
            <div 
              key={idx} 
              onClick={() => handleSelect(course)} 
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-sm">{course.courseCode}</span>
                  <span className="ml-2 text-sm text-gray-600">{course.courseName}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400">{course.credits} cr</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {course.basketType === 'Institute Core' ? 'Core' : 
                     course.basketType === 'Discipline Core' ? 'Dept Core' :
                     course.basketType === 'Discipline Elective' ? 'Elective' : 
                     course.basketType === 'HSS' ? 'HSS' : 'Other'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {value.length >= 2 && suggestions.length === 0 && (
        <div className="text-xs text-gray-400 mt-1">
          No matches. Try "CS", "MA", "ES", "EE", "ME", "CL", "CE"
        </div>
      )}
    </div>
  );
}