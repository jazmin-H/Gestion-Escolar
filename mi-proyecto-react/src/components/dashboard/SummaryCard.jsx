import Card from "../ui/Card.jsx"

const SummaryCard = ({ title, value, subtitle, isLoading, icon, colorClass = "text-blue-600" }) => {
  return (
    <Card
      title={title}
      value={value}
      subtitle={subtitle}
      isLoading={isLoading}
      className="hover:shadow-md transition-shadow duration-200"
    />
  )
}

export default SummaryCard
