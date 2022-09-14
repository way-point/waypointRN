// duration is in milleseconds
const TimeFormat = (duration: number) => {
  return new Date(Math.round(duration) * 1000).toISOString().substring(14, 19);
};

export default TimeFormat;
