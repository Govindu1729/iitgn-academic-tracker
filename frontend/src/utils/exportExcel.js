// frontend/src/utils/exportExcel.js
import * as XLSX from 'xlsx';

export const exportToExcel = (courses, fileName = 'course_record') => {
  const exportData = courses.map(course => ({
    'Course Code': course.courseCode,
    'Course Name': course.courseName,
    'Credits': course.credits,
    'Grade': course.grade || 'Not graded',
    'Semester': course.semester,
    'Academic Year': course.academicYear,
    'Category/Basket': course.basketType,
    'Status': course.isPlanned ? 'Planned' : 'Completed',
    'Department': course.department || 'Other'
  }));
  
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Courses');
  XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportGPAReport = (courses, cpi, semesterCPI) => {
  const data = [
    { Metric: 'Overall CPI', Value: cpi.toFixed(2) },
    { Metric: 'Total Credits Completed', Value: courses.filter(c => !c.isPlanned).reduce((s, c) => s + c.credits, 0) },
    { Metric: 'Total Courses', Value: courses.filter(c => !c.isPlanned).length }
  ];
  
  Object.keys(semesterCPI).forEach(sem => {
    data.push({ Metric: `CPI - ${sem}`, Value: semesterCPI[sem].toFixed(2) });
  });
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'CPI_Report');
  XLSX.writeFile(wb, `cpi_report_${new Date().toISOString().split('T')[0]}.xlsx`);
};
