function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validate() {
    const email = document.getElementById("Email").value;
    if (validateEmail(email)){
        document.getElementById("Email").value = "";
        const now = new Date();
        fetch(`http://numbersapi.com/${(now.getMonth() + 1)}/${now.getDate()}/date?json&notfound=floor`)
            .then(handleResponse)
            .then(data => {
                fetch('/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({Fact: data.text, Email: email})
                });
            })
            .catch(error => console.log(error));
    } else {
        alert("Enter a valid email address");
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

document.getElementById("Submit").addEventListener("click", validate, false);