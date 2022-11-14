export async function signUp(newInfo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.100.13:3010/api/auth/signup', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInfo)
    });
    const data = await response.json();
    return data;
}

export async function logIn(newInfo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.100.13:3010/api/auth/login', {
        method: 'POST',
        headers,
        body: JSON.stringify(newInfo)
    });
    const data = await response.json();
    return data;
}
