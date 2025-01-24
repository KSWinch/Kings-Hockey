export const sortGames = (games) => {
  return games
    .filter((game) => {
      const gameDate = new Date(game.date + ' 2025');
      return gameDate >= new Date('2025-01-01') && gameDate <= new Date('2025-06-30') && gameDate >= new Date();
    })
    .sort((a, b) => new Date(a.date + ' 2025') - new Date(b.date + ' 2025'));
};

// export function formatDateForCalendar(date) {
//   const months = {
//     Jan: '01',
//     Feb: '02',
//     Mar: '03',
//     Apr: '04',
//     May: '05',
//     Jun: '06',
//     Jul: '07',
//     Aug: '08',
//     Sep: '09',
//     Oct: '10',
//     Nov: '11',
//     Dec: '12',
//   };

//   // Split the input date string (e.g., "Feb 3")
//   const [monthAbbr, dayRaw] = date.split(' ');

//   // Convert to numeric month and pad day with leading zero
//   const month = months[monthAbbr] || '01'; // Default to January if unmatched
//   const day = String(dayRaw).padStart(2, '0'); // Ensure day is two digits

//   // Hardcoded year, hours, and minutes
//   const year = '2025';
//   const hours = '10'; // Hardcoded to 10 AM
//   const minutes = '15'; // Hardcoded to 15 minutes past the hour

//   // Hardcoded start and end times
//   const startTime = `${hours}${minutes}00`; // 10:15:00 AM UTC
//   const endTime = `11${minutes}00`; // 11:15:00 AM UTC (1 hour later)

//   // Format the dates
//   const startDate = `${year}${month}${day}T${startTime}Z`;
//   const endDate = `${year}${month}${day}T${endTime}Z`; // Use endTime here

//   // Return the start and end dates in Google Calendar's required format
//   return `${startDate}/${endDate}`;
// }

export function formatDateForCalendar(date, time) {
  // Manually hardcoded values (for testing purposes)
  const year = '2025'; // Hardcoded year
  const month = '02'; // February
  const day = '03'; // 3rd
  const hours = '10';
  const minutes = '15';

  // Format the start and end date for Google Calendar
  const startDate = `${year}${month}${day}T${hours}${minutes}00Z`; // Start date in UTC
  const endDate = `${year}${month}${day}T${hours}${minutes}00Z`; // End date same as start

  return `${startDate}/${endDate}`; // Both start and end dates in one field
}
