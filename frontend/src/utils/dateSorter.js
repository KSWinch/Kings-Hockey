export const sortGames = (games) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Time set to midnight
  return games
    .filter((game) => {
      const gameDate = new Date(game.date + ' 2025');
      return gameDate >= today && gameDate >= new Date('2025-01-01') && gameDate <= new Date('2025-06-30');
    })
    .sort((a, b) => new Date(a.date + ' 2025') - new Date(b.date + ' 2025'));
};

export const convertToMilitaryTime = (time) => {
  // Ensure a space before AM/PM
  const match = time.match(/^(\d+):(\d+)(AM|PM)$/);
  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  // Extract hours, minutes, and period
  // eslint-disable-next-line no-unused-vars
  let [_, hours, minutes, period] = match;
  hours = parseInt(hours, 10);

  // Convert to military time
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  // Format as HH:mm
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};
