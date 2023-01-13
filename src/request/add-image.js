export async function addImage(file) {
    const headers = new Headers();
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/api/media/images', {
        method: 'POST',
        headers,
        body: file
    });
    return response.json();
}
