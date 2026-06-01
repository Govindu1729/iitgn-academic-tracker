// frontend/src/components/CPIWarning.jsx
export default function CPIWarning({ cpi, children }) {
  const isLowCPI = cpi < 6.0;
  const isMediumCPI = cpi >= 6.0 && cpi < 7.0;
  const isGoodCPI = cpi >= 7.0 && cpi < 8.5;
  const isExcellentCPI = cpi >= 8.5;
  
  if (isLowCPI) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-red-600 text-xl mr-3">⚠️</span>
          <div>
            <p className="font-semibold text-red-800">CPI below 6.0</p>
            <p className="text-red-700 text-sm">Your current CPI is {cpi.toFixed(2)}. Please consult your faculty advisor.</p>
          </div>
        </div>
        {children}
      </div>
    );
  }
  
  if (isMediumCPI) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-yellow-600 text-xl mr-3">📊</span>
          <div>
            <p className="font-semibold text-yellow-800">CPI: {cpi.toFixed(2)}</p>
            <p className="text-yellow-700 text-sm">You need CPI ≥ 7.0 for semester overload permission.</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isGoodCPI) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-green-600 text-xl mr-3">🎯</span>
          <div>
            <p className="font-semibold text-green-800">CPI: {cpi.toFixed(2)}</p>
            <p className="text-green-700 text-sm">Good standing! You are eligible for overload (up to 32 credits with advisor approval).</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isExcellentCPI) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-blue-600 text-xl mr-3">🏆</span>
          <div>
            <p className="font-semibold text-blue-800">Excellent CPI: {cpi.toFixed(2)}</p>
            <p className="text-blue-700 text-sm">Eligible for fellowship (CPI ≥ 8.0) and academic honors.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}
