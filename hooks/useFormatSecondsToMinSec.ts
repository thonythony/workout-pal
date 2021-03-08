export default function useFormatSecondsToMinSec(
  seconds: number
): { min: number; sec: number } {
  return {
    min: Math.floor(seconds / 60),
    sec: Math.floor(seconds % 60),
  };
}
