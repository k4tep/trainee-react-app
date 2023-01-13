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

    let queryPathBase = process.env.REACT_APP_URL_API + '/characters';
    const queryParamsKeys = Object.keys(queryParams);
    if (queryParamsKeys.length) {
        queryPathBase += '?';
        queryParamsKeys.forEach((key) => {
            queryPathBase += `${key}=${queryParams[key]}&`;
        });
    }
    const response = await fetch(queryPathBase, {
        method: 'GET',
        headers
    });
    return response;
}

export async function getCharacter(id) {
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Allow-Origin', '*');
    headers.append('Authorization', authToken);

    const response = await fetch(process.env.REACT_APP_URL_API + '/characters/' + id, {
        method: 'GET',
        headers
    });
    return response;
}
