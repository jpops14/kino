export const isConflicting = (value: Dayjs): boolean => {
    if (value || startDate || selectedMovie) {
        const start = startDate.add(value.hour(), 'hour').add(value.minute(), 'minute');
        const end = start.add(selectedMovie?.duration, 'minute');

    }
}