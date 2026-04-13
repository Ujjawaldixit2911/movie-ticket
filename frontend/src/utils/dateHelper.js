export const formatPrettyDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const isUpcomingShow = (showDate, showTime) => {
  const dt = new Date(`${showDate}T${showTime}:00`);
  return dt >= new Date();
};
