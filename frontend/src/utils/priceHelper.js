export const getSeatPrice = (seatType, basePrices) => basePrices?.[seatType] || 150;
