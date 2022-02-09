export async function getTalents(populate = false) {
    const endpoint = import.meta.env.VITE_API_URL
        + '/talents'
        + (populate ? '?populate=*' : '');

    return _request(endpoint);
}

export async function getTalent(id: number, populate = false) {
    const endpoint = import.meta.env.VITE_API_URL
        + `/talents/${id}`
        + (populate ? '?populate=*' : '');

    return _request(endpoint);
}

export async function getLocutionTypes() {
    const endpoint = import.meta.env.VITE_API_URL
        + '/locution-types'

    return _request(endpoint);
}

export async function getPageHome() {
    const endpoint = import.meta.env.VITE_API_URL
        + '/page-home?populate=*'

    return _request(endpoint);
}

export async function getPageAbout() {
    const endpoint = import.meta.env.VITE_API_URL
        + '/page-about?populate=*'

    return _request(endpoint);
}

//

async function _request(endpoint: string) {
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