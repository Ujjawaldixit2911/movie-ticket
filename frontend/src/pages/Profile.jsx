import { useMemo } from "react";
import DashboardCard from "../components/DashboardCard";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Ujjawal",
    email: "ujjawaldixit06@gmail.com",
    role: "user",
  };

  const bookings = JSON.parse(localStorage.getItem("myBookings")) || [];

  const { confirmedCount, cancelledCount } = useMemo(() => {
    const confirmed = bookings.filter(
      (booking) => booking.status === "Confirmed"
    ).length;

    const cancelled = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;

    return {
      confirmedCount: confirmed,
      cancelledCount: cancelled,
    };
  }, [bookings]);

  return (
    <section className="section narrow-top">
      <div className="profile-card glass">
        <h1>{storedUser.name}</h1>
        <p className="muted">{storedUser.email}</p>

        <div className="dashboard-grid">
          <DashboardCard
            title="Confirmed Bookings"
            value={confirmedCount}
          />
          <DashboardCard
            title="Cancelled Bookings"
            value={cancelledCount}
          />
          <DashboardCard
            title="Role"
            value={storedUser.role}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;