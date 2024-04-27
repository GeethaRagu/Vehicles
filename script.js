//get all the html elements

const brandSelect = document.getElementById("brandSelect");
const modelSelect = document.getElementById("modelSelect");
const yearSelect = document.getElementById("yearSelect");
const displayDetails = document.getElementById("displayDetails");
let brandValue;
let modelValue;
let yearValue;
//load brands in select box on page load

window.addEventListener("load",()=>{
const fetchAPI = fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
fetchAPI
.then((result)=>result.json())
.then((data)=>{
    //console.log(data);
    //brandSelect.innerHTML = `<option>Select a brand</option>`
    for(let i=0;i<data.length;i++){
        const optionButton = document.createElement("option");
        //console.log(data[i].nome);
       optionButton.setAttribute("value",`${data[i].codigo}`);
       optionButton.innerHTML = `${data[i].nome}`;
       brandSelect.append(optionButton);
    }
})
.catch((e)=>console.log(e));
})

//load models based on brands selected
brandSelect.addEventListener("change",()=>{
    brandValue = brandSelect.value;
    modelSelect.innerHTML = "";
    //console.log(brandValue);
    const fetchAPIModel = fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandValue}/modelos`);
    fetchAPIModel
    .then((res)=>res.json())
    .then((element)=>{
        //console.log(element);
        //modelSelect.innerHTML = `<option>Select a model</option>`;
        //console.log(element.modelos.length)
        for(let i=0;i<element.modelos.length;i++){
        const optionButtonModel = document.createElement("option");
        //console.log(element.modelos[i].nome);
        optionButtonModel.setAttribute("value",`${element.modelos[i].codigo}`);
        optionButtonModel.innerHTML = `${element.modelos[i].nome}`;
        modelSelect.append(optionButtonModel);
        }
    })
    .catch((e)=>console.log(e))
});

//load year based on brands and models selected
modelSelect.addEventListener("change",()=>{
    modelValue = modelSelect.value;
    yearSelect.innerHTML = " ";
    //console.log(modelValue);
    const fetchAPIYear = fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandValue}/modelos/${modelValue}/anos`);
    fetchAPIYear
    .then((models)=>models.json())
    .then((values)=>{
        //console.log(values);
        //yearSelect.innerHTML = `<option>Select a year</option>`;
        //console.log(values.length);
        for(let i=0;i<values.length;i++){
            const optionButtonYear = document.createElement("option");
            //console.log(element.modelos[i].nome);
            optionButtonYear.setAttribute("value",`${values[i].codigo}`);
            optionButtonYear.innerHTML = `${values[i].nome}`;
            yearSelect.append(optionButtonYear);
        }
    })
    .catch((e)=>console.log(e))
});

//Display vehicle details based on brands  models and year selected
yearSelect.addEventListener("change",()=>{
    yearValue = yearSelect.value;
    //console.log(yearValue);
    const fetchAPIDetails = fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandValue}/modelos/${modelValue}/anos/${yearValue}`);
    fetchAPIDetails
    .then((details)=>details.json())
    .then((info)=>{
       //console.log(info);
       //displayDetails.innerHTML = `Brand ${info.Marca} ; Model ${info.Modelo}; Model Year ${info.AnoModelo} ; Fuel ${info.Combustivel} ; Reference month ${info.MesReferencia} ; Value ${info.Valor}`;
       displayDetails.innerHTML = `
       <div class="col">
       <h5>Brand :</h5><br/>
       <h5>Model :</h5><br/>
       <h5>Model year :</h5><br/>
       <h5>Fuel :</h5><br/>
       <h5>Reference month :</h5><br/>
       <h5>Value :</h5>
       </div>
       <div class="col1">
       <h5>${info.Marca}</h5><br/>
       <h5>${info.Modelo}</h5><br/>
       <h5>${info.AnoModelo}</h5><br/>
       <h5>${info.Combustivel}</h5><br/>
       <h5>${info.MesReferencia}</h5><br/>
       <h5>${info.Valor}</h5><br/>
       </div>
       `;
       document.getElementById("displayDetails").setAttribute("style","visibility:visible");
    })
    .catch((e)=>console.log(e))
});
