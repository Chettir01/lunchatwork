export function getLunchList(){
    return fetch (`http://localhost:8080/lunch/list`);
}

export function postLunch(data){
    return fetch (`http://localhost:8080/lunch/create`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export function updateLunch(data){
    return fetch(`http://localhost:8080/lunch/modify`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export function removeLunch(id){
    return fetch(`http://localhost:8080/lunch/delete/${id}`,{
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    });
}

export function displayLunch(id){
    return fetch(`http://localhost:8080/lunch/id?id=${id}`);
}

export function getLunchDate(){
    return fetch (`http://localhost:8080/lunch/dates`);
}