export async function deleteCharacter(id) {
    const headers = new Headers();
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Allow-Origin', '*');
    headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + 'characters/' + id, {
        method: 'DELETE',
        headers
    });

    return response;
}
