// duration is in milleseconds
const TimeFormat = (duration: number | undefined) => {
  if (!duration) {
    return null;
  }
  return new Date(Math.round(duration) * 1000).toISOString().substring(14, 19);
};

export default TimeFormat;
