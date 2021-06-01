let username = 'admin';
let password = 'admin';
let url = `http://localhost:5001/api/users/`
let authString = `${username}:${password}`
let headers = new Headers();

document.addEventListener("DOMContentLoaded",()=> {
        headers.set('Authorization', 'Basic ' + btoa(authString))
        fetch(url,{method: 'GET', headers: headers})
                .then(function (response) {
                return response.json()
 
        })
        .then(data);
})
function data(dsts) {

        var list = document.getElementById("list");
        for(l = 0;l < dsts.length; l++) {        
                let userOptions = {
                        labels: [],
                        id: [],
                };                
                let userPreferences = {
                        greeting: "",
                        title: "",
                        personalGreeting : function() {
                                return this.greeting + " " + this.title + " voit kuulua seuraaviin ryhmiin:";
                        }
                };
                let data = dsts[l];
                var ul = document.createElement("ul");
                var h2 = document.createElement("h2");
                for(o = 0;o < data.settings.length; o++) {
                        
                        let control = data.settings[o];
                        let user = control.svalue;
                        
                        if(control.name == "uusiasetus") {
                                userPreferences.greeting = control.svalue
                        }
                        if(control.name == "loginname"){
                                userPreferences.title = user;
                        }              
                        if(control.name == "group"){
                                for(i = 0; i < control.options.length; i++) {
                                        let values =  control.options[i];
                                        
                                        if(values.ivalue != 0) {
                                                userOptions.labels.unshift(values.label);
                                                userOptions.id.unshift(values.value);     
                                        }
                                }
                        }                                      
                }

                h2.innerHTML = userPreferences.personalGreeting()
                list.appendChild(h2);
                for(j = userOptions.labels.length -1 ; 0 <= j  ; j--) {
                        let il = document.createElement("li");
                        il.innerHTML = userOptions.labels[j];
                        ul.appendChild(il);
                        let li = document.createElement("li");
                        li.innerHTML = userOptions.id[j];
                        ul.appendChild(li);
                        list.appendChild(ul);
                }             
        }
}
