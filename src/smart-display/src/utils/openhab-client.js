function getItem(name) {
    return window.fetch(`/openhab/rest/items/${name}`).then((response) => {
        return response.json();
    })
        .catch((reason) => {

        });
}

export { getItem };