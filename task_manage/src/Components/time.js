const formatTimestamp = (timestamp) =>
{
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(timestamp);

    const monthDayYear = date.toLocaleDateString('en-US', options);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'p.m.' : 'a.m.';
    const formattedTime = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${ampm}`;

    return `${monthDayYear}, ${formattedTime}`;
}
export default formatTimestamp;