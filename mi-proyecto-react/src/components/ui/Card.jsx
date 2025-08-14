const Card = ({ title, value, subtitle, isLoading = false, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className}`}>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-12">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </>
          )}
        </div>
      </div>
    )
  }
  
  export default Card
  