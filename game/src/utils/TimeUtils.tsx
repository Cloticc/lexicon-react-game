export const formatElapsedTime = (timeInMillis: number): string => {
  const days = Math.floor(timeInMillis / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeInMillis % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeInMillis % (1000 * 60)) / 1000);
  const milliseconds = timeInMillis % 1000;

  // Build the formatted time string
  let formattedTime = "";

  if (days > 0) {
    formattedTime += `${days}:`;
  }
  if (hours > 0 || formattedTime !== "") {
    formattedTime += `${hours}:`;
  }
  if (minutes > 0 || formattedTime !== "") {
    formattedTime += `${minutes}:`;
  }

  formattedTime += `${seconds}:${milliseconds}`;

  return formattedTime;
};
