const canonicalMap = new Map([
  // Discipline Core variations
  ['discipline core', 'Discipline Core'],
  ['dept core', 'Discipline Core'],
  ['dept-core', 'Discipline Core'],
  // Discipline Elective variations
  ['discipline elective', 'Discipline Elective'],
  ['discipline-elective', 'Discipline Elective'],
  ['dept elective', 'Discipline Elective'],
  // Institute Core
  ['institute core', 'Institute Core'],
  ['institute-core', 'Institute Core'],
  ['core', 'Institute Core'],
  // HSS
  ['hss', 'HSS'],
  // Science Basket
  ['science basket', 'Science Basket'],
  ['science', 'Science Basket'],
  // Mathematics Basket
  ['mathematics basket', 'Mathematics Basket'],
  ['math basket', 'Mathematics Basket'],
  ['mathematics', 'Mathematics Basket'],
  // Materials Basket
  ['materials basket', 'Materials Basket'],
  ['materials', 'Materials Basket'],
  // General Education
  ['general education', 'General Education'],
  ['gen ed', 'General Education'],
  ['general', 'General Education'],
  // Open Elective
  ['open elective', 'Open Elective'],
  ['open', 'Open Elective'],
  ['oe', 'Open Elective'],
  // Project
  ['project', 'Project'],
  ['capstone', 'Project'],
  // Other / fallback
  ['other', 'Other']
]);

export function normalizeBasketName(raw) {
  if (!raw) return 'Other';
  const key = String(raw).trim().toLowerCase();
  if (canonicalMap.has(key)) return canonicalMap.get(key);

  // Try fuzzy matching by removing punctuation and extra spaces
  const cleaned = key.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (canonicalMap.has(cleaned)) return canonicalMap.get(cleaned);

  // If not recognized, title-case the cleaned string
  return cleaned.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

export default normalizeBasketName;
