// frontend/src/components/ProgressBar.jsx
export default function ProgressBar({ label, current, target, color = 'blue', showPercentage = true }) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isComplete = current >= target;
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    teal: 'bg-teal-600',
    pink: 'bg-pink-600'
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-500">
            {current} / {target} credits
            {showPercentage && ` (${Math.round(percentage)}%)`}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${colorClasses[color]} rounded-full h-2.5 transition-all duration-500 ${isComplete ? 'bg-green-600' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {isComplete && target > 0 && (
        <p className="text-xs text-green-600 mt-1">✓ Requirement met</p>
      )}
    </div>
  );
}
