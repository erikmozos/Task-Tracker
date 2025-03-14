let fs = require("fs");

fs.readFile("task.json", "utf-8", (err, data) => {
  if (err) {
    console.log("Error al leer", err);
    fs.writeFileSync("task.json", JSON.stringify({}, null, 2));
    console.log("JSON");
  }

  console.log("datos", data);
});

const arguments = process.argv;
console.log(arguments);
console.log(arguments[2]);

switch (arguments[2]) {
  case "add":
    addTask(arguments[3]);
    break;
  case "update":
    updateTask();
    break;
  case "delete":
    deleteTask();
    break;
  case "list":
    listTask(arguments[3]);
    break;
}

function addTask(arg) {

    const currDate = Date.now();
  const lastId = () => {
    try {
      const datosJson = JSON.parse(fs.readFileSync("task.json", "utf-8"));

      if (!Array.isArray(datosJson) || datosJson.length === 0) {
        return 1;
      }

      const lastId = datosJson[datosJson.length - 1].id;
      return lastId + 1;
    } catch (error) {
      return;
    }
  };

  console.log(lastId(), "ultimaid");
  const newId = lastId()
  const data = {
      "id" : newId,
      "description" : arg,
      "status" : 1,
      "createdAt" : currDate,
      "updatedAt" : currDate
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
