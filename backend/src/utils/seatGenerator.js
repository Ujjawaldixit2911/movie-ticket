const rows = [
  { label: 'A', type: 'Platinum' },
  { label: 'B', type: 'Platinum' },
  { label: 'C', type: 'Gold' },
  { label: 'D', type: 'Gold' },
  { label: 'E', type: 'Silver' },
  { label: 'F', type: 'Silver' }
];

const generateSeats = () => {
  const seats = [];
  rows.forEach((row) => {
    for (let i = 1; i <= 8; i++) {
      seats.push({
        seatNumber: `${row.label}${i}`,
        type: row.type,
        isBooked: false
      });
    }
  });
  return seats;
};

export default generateSeats;
