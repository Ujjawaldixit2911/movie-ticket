const BookingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <button
        className={`btn ${activeTab === "upcoming" ? "btn-primary" : "btn-outline"}`}
        onClick={() => setActiveTab("upcoming")}
      >
        Upcoming
      </button>

      <button
        className={`btn ${activeTab === "past" ? "btn-primary" : "btn-outline"}`}
        onClick={() => setActiveTab("past")}
      >
        Past
      </button>
    </div>
  );
};

export default BookingTabs;