const DashboardCard = ({ title, value }) => (
  <div className="dashboard-card glass">
    <p className="muted small">{title}</p>
    <h2>{value}</h2>
  </div>
);

export default DashboardCard;
