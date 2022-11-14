export async function addImage(file) {
    const headers = new Headers();
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.100.13:3010/api/media/images', {
        method: 'POST',
        headers,
        body: file
    });
    return response.json();
}
