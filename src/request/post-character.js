export async function postCharacter(newInfo) {
    delete newInfo._id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/characters', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInfo)
    });
    return response;
}
