let fs = require("fs");

let now = new Date(Date.now());
let timeString = now.toLocaleTimeString();

console.log(timeString);

fs.readFile("task.json", "utf-8", (err, data) => {
  if (err) {
    console.log("Error al leer", err);
  }
});

const arguments = process.argv;

switch (arguments[2]) {
  case "add":
    addTask(arguments[3]);
    break;
  case "update":
    updateTask(arguments[3], arguments[4]);
    break;
  case "delete":
    deleteTask(arguments[3]);
    break;
  case "list":
    listTask(arguments[3], arguments[4]);
    break;

  case "mark-in-progress":
    changeStatus(arguments[3], "progress");
    break;
  
  case "mark-done":
    changeStatus(arguments[3], "done");
    break;
}

function addTask(arg) {

  const lastId = () => {
    try {

      if(!fs.existsSync("task.json")){
        fs.writeFileSync("task.json", JSON.stringify([],null, 2));
        console.log("JSON");
        return 1;
      }

      const data = fs.readFileSync("task.json", "utf-8");

      if(!data || !data.trim()){
        fs.writeFileSync("task.json",  JSON.stringify([], null, 2));
        return 1;
      }

      const datosJson = JSON.parse(data);

      if (!Array.isArray(datosJson) || datosJson.length === 0) {
        return 1;
      }else{
        const lastId = datosJson[datosJson.length - 1].id;
        return lastId + 1;
      }

    } catch (error) {
      return 1;
    }
  };

  console.log(lastId(), "ultimaid");
  const newId = lastId()
  const data = {
      "id" : newId,
      "description" : arg,
      "status" : 1,
      "createdAt" : timeString,
      "updatedAt" : timeString
  }
  
  const addData = (nuevaFila) =>{
    try{
        let datosJson = [];
        if(fs.existsSync('task.json')){
            const data = fs.readFileSync("task.json", "utf-8");
            if(data.trim()){
                datosJson = JSON.parse(data)
            }
        }

        datosJson.push(nuevaFila);

        fs.writeFileSync('task.json', JSON.stringify(datosJson, null, 5), 'utf-8')
        console.log("Fila okei", nuevaFila);
    }catch(error){
        console.log(error);
    }
  }
  addData(data);
}


function updateTask(id, task){
  let data = fs.readFileSync("task.json", "utf-8");
  console.log(data, "udpate p`rpva");

  let datos = JSON.parse(data);
  console.log(id, "es la id de update");

  datos.forEach(element => {
    if(element.id == id){
      console.log(element.id, "foreach");
      console.log(element.description);
      element.description = task;
      element.updatedAt = timeString;
    }
  });

  fs.writeFileSync("task.json", JSON.stringify(datos, null, 2), "utf-8")
}

function deleteTask(id){
  let data = fs.readFileSync("task.json", "utf-8");
  let jsonData = JSON.parse(data)
  jsonData = jsonData.filter(item => item.id != id)

  console.log(jsonData, "eliminado");
  fs.writeFileSync("task.json", JSON.stringify(jsonData, null, 2), "utf-8")
}


function listTask(arg){
  let data = fs.readFileSync("task.json", "utf-8");
  let jsonData = JSON.parse(data);

  jsonData.forEach(element =>{
    if(arg){
      if(arg == "done"){
        if(element.status == 1){
          console.log(` \n ID: ${element.id}
            \n Description: ${element.description}
            \n Status: ${element.status == 1 ? "Pending" : "Finished"}
            \n Created At: ${element.createdAt}
            \n Updated At: ${element.updatedAt}
            \n -------------------------------`);
        }
      }else if(arg = "in-progress"){
        if(element.status == 0){
          console.log(` \n ID: ${element.id}
            \n Description: ${element.description}
            \n Status: ${element.status == 1 ? "Pending" : "Finished"}
            \n Created At: ${element.createdAt}
            \n Updated At: ${element.updatedAt}
            \n -------------------------------`);
        }
      }
    }else{

      console.log(` \n ID: ${element.id}
        \n Description: ${element.description}
        \n Status: ${element.status == 1 ? "Pending" : "Finished"}
        \n Created At: ${element.createdAt}
        \n Updated At: ${element.updatedAt}
        \n -------------------------------`);

    }
  })
}

function changeStatus(id, type){

  let data = fs.readFileSync("task.json", "utf-8");
  console.log(type, "tipus");

  let datos = JSON.parse(data);
  console.log(id, "es la id de update");

  if(type == "progress"){
    datos.forEach(element => {
      if(element.id == id){
        element.status = 1;
        element.updatedAt = Date.now();
      }
    });

  }

    if(type == "done"){
      datos.forEach(element =>{
        if(element.id == id){
          element.status = 0;
          element.updatedAt = Date.now();
        }
      })
    }
  
  fs.writeFileSync("task.json", JSON.stringify(datos, null, 2), "utf-8")
}