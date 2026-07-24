const canonicalMap = new Map([
  ['discipline core', 'Discipline Core'],
  ['dept core', 'Discipline Core'],
  ['dept-core', 'Discipline Core'],
  ['discipline elective', 'Discipline Elective'],
  ['discipline-elective', 'Discipline Elective'],
  ['dept elective', 'Discipline Elective'],
  ['institute core', 'Institute Core'],
  ['institute-core', 'Institute Core'],
  ['core', 'Institute Core'],
  ['hss', 'HSS'],
  ['science basket', 'Science Basket'],
  ['science', 'Science Basket'],
  ['mathematics basket', 'Mathematics Basket'],
  ['math basket', 'Mathematics Basket'],
  ['mathematics', 'Mathematics Basket'],
  ['materials basket', 'Materials Basket'],
  ['materials', 'Materials Basket'],
  ['general education', 'General Education'],
  ['gen ed', 'General Education'],
  ['general', 'General Education'],
  ['open elective', 'Open Elective'],
  ['open', 'Open Elective'],
  ['oe', 'Open Elective'],
  ['project', 'Project'],
  ['capstone', 'Project'],
  ['other', 'Other']
]);

export function normalizeBasketName(raw) {
  if (!raw) return 'Other';
  const key = String(raw).trim().toLowerCase();
  if (canonicalMap.has(key)) return canonicalMap.get(key);
  const cleaned = key.replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (canonicalMap.has(cleaned)) return canonicalMap.get(cleaned);
  return cleaned.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

export default normalizeBasketName;
