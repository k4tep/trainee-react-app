export async function deleteCharacter(id) {
    const headers = new Headers();
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Allow-Origin', '*');
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.31.68:3010/api/characters/' + id, {
        method: 'DELETE',
        headers
    });
    const data = await response.json();
    return data;
}
