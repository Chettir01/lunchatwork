// const url = ""

export function getPersonList(){
    return fetch (`http://localhost:8080/person/list`);
}

export function postPerson(data){
    return fetch (`http://localhost:8080/person/create`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export function getPersonsName(){
    return fetch(`http://localhost:8080/person/listName`);
}

export function updatePerson(data){
    return fetch(`http://localhost:8080/person/modify`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export function removePerson(email){
    return fetch(`http://localhost:8080/person/delete/${email}`,{
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    });
}

export function displayPerson(email){
    return fetch(`http://localhost:8080/person/email?email=${email}`);
}

export function displayPersonById(id){
    return fetch(`http://localhost:8080/person/id?id=${id}`);
}

export function verifPerson(email){
    return fetch(`http://localhost:8080/person/verification/email?email=${email}`);
}


