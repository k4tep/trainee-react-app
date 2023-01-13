export async function putCharacter(newInfo, id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/characters/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(newInfo)
    });

    return response;
}
