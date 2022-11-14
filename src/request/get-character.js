export async function getCharacters(page, search, limit, sortMode = null, sortField = null) {
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Allow-Origin', '*');
    headers.append('Authorization', authToken);

    if (sortField === 'id') {
        sortField = '_id';
    }

    const sortModeAlias = {
        ascending: 'asc',
        descending: 'desc'
    };

    const queryParams = {
        limit,
        page,
        search,
        ...(sortMode && { sortMode: sortModeAlias[sortMode] }),
        ...(sortField && { sortField })
    };

    let queryPathBase = 'http://192.168.100.13:3010/api/characters';
    const queryParamsKeys = Object.keys(queryParams);
    if (queryParamsKeys.length) {
        queryPathBase += '?';
        queryParamsKeys.forEach((key) => {
            queryPathBase += `${key}=${queryParams[key]}&`;
        });
    }
    console.log(queryPathBase);
    const response = await fetch(queryPathBase, {
        method: 'GET',
        headers
    });
    const data = await response.json();
    return data;
}

export async function getCharacter(id) {
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Allow-Origin', '*');
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.100.13:3010/api/characters/' + id, {
        method: 'GET',
        headers
    });
    const data = await response.json();
    return data;
}
