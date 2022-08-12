
const getBookings = async () => {
    const response = await fetch('/api/book/get-events', { method: 'GET' });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export default getBookings;