let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
let inputBtn = document.getElementById("input-btn");
let clearBtn = document.getElementById("clear-btn");
let inputEl = document.getElementById("input-el");
let tabBtn = document.getElementById("tab-btn")
let ulEl = document.getElementById("ul-el");
let myLeads = [];

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
});

clearBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = []
    render(myLeads);
});

function render(leads) {
    let listItems = ""
    for(let i = 0; i < myLeads.length; i++){
       listItems += `
            <li> 
                <a href="${myLeads[i]}" target= "_blank">
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
    inputEl.value = ""
}