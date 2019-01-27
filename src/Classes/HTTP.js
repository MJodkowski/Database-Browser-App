class HTTP {

    static async get(url) {
        const results = await fetch(url);
        if (results.ok) {
            return results.json();
        } else throw new Error(`Request could not be completed: status ${results.status}`);
    } 
    static async delete(url, data) {
        const results = await fetch(url + data, {
            method: 'DELETE'
        });
        if (results.ok) {
            return "Data successfully deleted";
        } else throw new Error(`Request could not be completed: status ${results.status}`);
    } 
}

export default HTTP;