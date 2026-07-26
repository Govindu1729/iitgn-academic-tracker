// frontend/src/utils/basketMapper.js
// Complete basket name mapping for IITGN

const canonicalMap = new Map([
  // ==================== DISCIPLINE CORE ====================
  ['discipline core', 'Discipline Core'],
  ['dept core', 'Discipline Core'],
  ['dept-core', 'Discipline Core'],
  ['department core', 'Discipline Core'],
  ['core', 'Discipline Core'],
  ['dc', 'Discipline Core'],
  
  // ==================== DISCIPLINE ELECTIVE ====================
  ['discipline elective', 'Discipline Elective'],
  ['discipline-elective', 'Discipline Elective'],
  ['dept elective', 'Discipline Elective'],
  ['department elective', 'Discipline Elective'],
  ['elective', 'Discipline Elective'],
  ['de', 'Discipline Elective'],
  
  // ==================== INSTITUTE CORE ====================
  ['institute core', 'Institute Core'],
  ['institute-core', 'Institute Core'],
  ['institute', 'Institute Core'],
  ['ic', 'Institute Core'],
  
  // ==================== HSS ====================
  ['hss', 'HSS'],
  ['humanities', 'HSS'],
  ['humanities and social sciences', 'HSS'],
  ['social sciences', 'HSS'],
  
  // ==================== SCIENCE BASKET ====================
  ['science basket', 'Science Basket'],
  ['science', 'Science Basket'],
  ['sci', 'Science Basket'],
  ['sb', 'Science Basket'],
  
  // ==================== MATHEMATICS BASKET ====================
  ['mathematics basket', 'Mathematics Basket'],
  ['math basket', 'Mathematics Basket'],
  ['mathematics', 'Mathematics Basket'],
  ['math', 'Mathematics Basket'],
  ['mb', 'Mathematics Basket'],
  
  // ==================== MATERIALS BASKET ====================
  ['materials basket', 'Materials Basket'],
  ['materials', 'Materials Basket'],
  ['mat', 'Materials Basket'],
  
  // ==================== GENERAL EDUCATION ====================
  ['general education', 'General Education'],
  ['gen ed', 'General Education'],
  ['general', 'General Education'],
  ['ge', 'General Education'],
  
  // ==================== OPEN ELECTIVE ====================
  ['open elective', 'Open Elective'],
  ['open', 'Open Elective'],
  ['oe', 'Open Elective'],
  ['free elective', 'Open Elective'],
  ['fe', 'Open Elective'],
  
  // ==================== PROJECT ====================
  ['project', 'Project'],
  ['capstone', 'Project'],
  ['thesis', 'Project'],
  ['btech project', 'Project'],
  ['pr', 'Project'],
  
  // ==================== EXTERNAL EXPOSURE ====================
  ['external exposure', 'External Exposure'],
  ['ee', 'External Exposure'],
  ['internship', 'External Exposure'],
  ['industry', 'External Exposure'],
  
  // ==================== HONOURS ====================
  ['honours', 'Honours'],
  ['honors', 'Honours'],
  ['honour', 'Honours'],
  
  // ==================== MINOR ====================
  ['minor', 'Minor'],
  
  // ==================== MTECH ====================
  ['mtech courses', 'MTech Courses'],
  ['mtech', 'MTech Courses'],
  ['m.tech', 'MTech Courses'],
  
  // ==================== MSC ====================
  ['msc project', 'MSc Project'],
  ['msc', 'MSc Project'],
  ['m.sc', 'MSc Project'],
  
  // ==================== SECONDARY DISCIPLINE ====================
  ['secondary discipline core', 'Secondary Discipline Core'],
  ['secondary core', 'Secondary Discipline Core'],
  
  // ==================== OTHER ====================
  ['other', 'Other'],
  ['others', 'Other'],
  ['misc', 'Other'],
  ['miscellaneous', 'Other']
]);

/**
 * Normalize basket name to standard format
 * @param {string} raw - Raw basket name from input
 * @returns {string} - Normalized basket name
 */
export function normalizeBasketName(raw) {
  if (!raw) return 'Other';
  
  // Convert to string and clean
  const key = String(raw).trim().toLowerCase();
  
  // Direct match
  if (canonicalMap.has(key)) return canonicalMap.get(key);
  
  // Remove special characters and extra spaces
  const cleaned = key.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (canonicalMap.has(cleaned)) return canonicalMap.get(cleaned);
  
  // Handle common variations
  // Check if it contains core discipline keywords
  if (cleaned.includes('core') && (cleaned.includes('discipline') || cleaned.includes('dept'))) {
    return 'Discipline Core';
  }
  if (cleaned.includes('elective') && (cleaned.includes('discipline') || cleaned.includes('dept'))) {
    return 'Discipline Elective';
  }
  
  // Check for basket keywords
  if (cleaned.includes('science') && cleaned.includes('basket')) return 'Science Basket';
  if (cleaned.includes('math') && cleaned.includes('basket')) return 'Mathematics Basket';
  if (cleaned.includes('material') && cleaned.includes('basket')) return 'Materials Basket';
  if (cleaned.includes('general') && cleaned.includes('education')) return 'General Education';
  if (cleaned.includes('open') && cleaned.includes('elective')) return 'Open Elective';
  if (cleaned.includes('institute') && cleaned.includes('core')) return 'Institute Core';
  
  // Check if it's a known basket type
  const knownBaskets = [
    'discipline core', 'discipline elective', 'institute core', 
    'hss', 'science basket', 'mathematics basket', 'materials basket',
    'general education', 'open elective', 'project', 'external exposure',
    'honours', 'minor'
  ];
  
  for (const basket of knownBaskets) {
    if (cleaned.includes(basket)) {
      return canonicalMap.get(basket) || basket.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  
  // If nothing matches, title-case the cleaned string
  return cleaned.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

/**
 * Check if a basket name is valid
 * @param {string} basketName - Basket name to validate
 * @returns {boolean} - True if valid
 */
export function isValidBasket(basketName) {
  const normalized = normalizeBasketName(basketName);
  const validBaskets = [
    'Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 
    'Materials Basket', 'General Education', 'Discipline Core', 
    'Discipline Elective', 'Open Elective', 'Project', 
    'External Exposure', 'Honours', 'Minor', 'Secondary Discipline Core',
    'MTech Courses', 'MSc Project', 'Other'
  ];
  return validBaskets.includes(normalized);
}

/**
 * Get all valid basket types
 * @returns {string[]} - Array of valid basket names
 */
export function getAllBasketTypes() {
  return [
    'Institute Core',
    'HSS',
    'Science Basket',
    'Mathematics Basket',
    'Materials Basket',
    'General Education',
    'Discipline Core',
    'Discipline Elective',
    'Open Elective',
    'Project',
    'External Exposure',
    'Honours',
    'Minor',
    'Secondary Discipline Core',
    'MTech Courses',
    'MSc Project',
    'Other'
  ];
}

/**
 * Get basket color mapping for UI
 * @param {string} basketName - Basket name
 * @returns {string} - Color code
 */
export function getBasketColor(basketName) {
  const normalized = normalizeBasketName(basketName);
  const colorMap = {
    'Institute Core': 'blue',
    'HSS': 'purple',
    'Science Basket': 'green',
    'Mathematics Basket': 'orange',
    'Materials Basket': 'red',
    'General Education': 'pink',
    'Discipline Core': 'cyan',
    'Discipline Elective': 'teal',
    'Open Elective': 'indigo',
    'Project': 'orange',
    'External Exposure': 'yellow',
    'Honours': 'gold',
    'Minor': 'lime',
    'Secondary Discipline Core': 'purple',
    'MTech Courses': 'emerald',
    'MSc Project': 'rose',
    'Other': 'gray'
  };
  return colorMap[normalized] || 'gray';
}

/**
 * Get basket description for UI
 * @param {string} basketName - Basket name
 * @returns {string} - Description
 */
export function getBasketDescription(basketName) {
  const normalized = normalizeBasketName(basketName);
  const descriptionMap = {
    'Institute Core': 'Mandatory institute-level courses',
    'HSS': 'Humanities & Social Sciences courses',
    'Science Basket': 'Science basket courses (Physics, Chemistry, Biology, etc.)',
    'Mathematics Basket': 'Mathematics basket courses',
    'Materials Basket': 'Materials Engineering basket courses',
    'General Education': 'GE basket courses (Pass/Fail)',
    'Discipline Core': 'Department-specific core courses',
    'Discipline Elective': 'Department-specific elective courses',
    'Open Elective': 'Open electives from any department',
    'Project': 'Project courses (OPC, Capstone, Thesis)',
    'External Exposure': 'External exposure / Internship credits',
    'Honours': 'Honours track additional courses',
    'Minor': 'Minor track additional courses',
    'Secondary Discipline Core': 'Dual Major secondary discipline core courses',
    'MTech Courses': 'MTech course requirements',
    'MSc Project': 'MSc project requirements',
    'Other': 'Other basket types'
  };
  return descriptionMap[normalized] || 'Other basket type';
}

export default normalizeBasketName;