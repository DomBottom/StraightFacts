function verifiedNum(number){
    if (number == ""){
        alert("Try selecting a number");
        return false;
    } else if (number < 0){
        alert("Selected number can't be negative");
        return false;
    }
    return true;
}

function validateForm(evt){
    if (document.getElementById("EmTo").value === ""){
        alert("Try filling the To field");
        evt.preventDefault();
    } else if (document.getElementById("EmSubject").value === ""){
        alert("Try filling the Subject field");
        evt.preventDefault();
    } else if (!verifiedNum(document.getElementById("EmValue").value)){
        evt.preventDefault();
    }
}

function getFact(number){
    if (verifiedNum(number)) {
        let url = `http://numbersapi.com/${number}?json&notfound=floor`;
        fetch (url)
            .then(handleResponse)
            .then(data => {
                console.log(data);
                const newLi = document.createElement("li");
                newLi.appendChild(document.createTextNode(data.text));
                document.getElementById("ExFacts").appendChild(newLi);
            })
            .catch(error => console.log(error));
    }
}

function handleResponse(response){
    return response.json()
        .then(json => {
            if (response.ok) {
                return json
            } else {
                return Promise.reject(Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                }))
            }
        })
}

function clearFacts(){
    const list = document.getElementById("ExFacts");
    while (list.firstChild){
        list.removeChild(list.firstChild);
    }
}

document.getElementById("ExSubmit").addEventListener("click", function(){
    getFact(document.getElementById("ExValue").value)}, false);
document.getElementById("ExClear").addEventListener("click", clearFacts, false);
document.getElementById("EmForm").addEventListener("submit", function(evt){
    validateForm(evt)}, false);