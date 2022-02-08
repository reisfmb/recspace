export async function getTalents(populate = false) {
    const endpoint = import.meta.env.VITE_API_URL
        + '/talents'
        + (populate ? '?populate=*' : '');

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + import.meta.env.VITE_API_TOKEN }
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw Error(await response.text());
    }
}

export async function getTalent(id: number, populate = false) {
    const endpoint = import.meta.env.VITE_API_URL
        + `/talents/${id}`
        + (populate ? '?populate=*' : '');

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + import.meta.env.VITE_API_TOKEN }
    });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw Error(await response.text());
    }
}