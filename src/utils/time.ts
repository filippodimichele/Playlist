export function secondsToMinutes(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(mins).padStart(2,  '0')}:${String(sec).padStart(2, '0')}`;
}