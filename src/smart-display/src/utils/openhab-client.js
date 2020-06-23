function getItem(name) {
    return window.fetch(`/api/openhab/rest/items/${name}`).then((response) => {
        return response.json();
    })
        .catch((reason) => {

        });
}

export { getItem };