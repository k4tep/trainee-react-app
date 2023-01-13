export async function signUp(newInfo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // const authToken = `Bearer ${localStorage.getItem('token')}`;
    // headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/auth/signup', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInfo)
    });
    return response;
}

export async function logIn(newInfo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // const authToken = `Bearer ${localStorage.getItem('token')}`;
    // headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/auth/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInfo)
    });
    return response;
}
