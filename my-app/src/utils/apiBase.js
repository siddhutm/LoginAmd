export const get = (url, async=true) => {
    return fetch(url).then((res) => {
        return res && res.status === 200 ? res.json() : []
    });
}

export const post = (url, data) => {

    const keys = Object.keys(data);
    let bodyStr = '';
     keys.forEach(k => {
        bodyStr += `${k}=${data[k]}&`
    })

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Accept': 'application/json'
        //    'content-type': 'application/json'
        },
        // body:JSON.stringify(data)
        body:bodyStr
    }).then(function(res) {
        return res.json();
    });
}