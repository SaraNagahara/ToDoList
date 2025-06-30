import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

//Variables

  const [inputList, setList] = useState("");
  const [arrayList, setArrayList] = useState<string[]>([]);
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  });
  const [errorParagraph, setError] = useState("");
  
//Functions

function AddTask(){

    if(!inputList){
      setError("Attention: Write your task")
      return;
    }else{
      setError("");
    }


  if(editTask.enabled){
      saveTheEdit();
      return;
    }

  setArrayList(tasks => [...tasks, inputList])
  setList("")
}

function saveTheEdit(){
  const findIndex = arrayList.findIndex(task => task === editTask.task);
    const AllTasks = [...arrayList];

        AllTasks[findIndex] = inputList;
        setArrayList(AllTasks)

        setEditTask({
          enabled: false,
          task: ''
        })

        setList("")
}

function Edit(item: string){
  setList(item)
  setEditTask({
    enabled: true,
    task: item
  })
}

function Delete(item: string){
      const removeFromList = arrayList.filter(task => task !== item)
      setArrayList(removeFromList)
} 

//Return 

  return (
    <>
     {/* Form HTML */}
     <h1 id='title'>To Do List:</h1>
     <div className='div-inputs'>
      <label htmlFor="inputTask" id="label-input">Task: 
        <input type="text" name="inputTask" id="inputTask" placeholder='Write your task here' value={inputList} onChange={(e) => setList(e.target.value)}/>
      </label>
      <button id='Add_Button' onClick={AddTask}>Add Task</button>
     </div>

     {/* Error message div*/}
     <div className='error-message'>
        <p id="errorMessage" style={{ color: 'red' }}><strong>{errorParagraph}</strong></p>
     </div>

     {/* List div */}
    <div className={arrayList.length > 0 ? "div-tasks" : ""} id="div-tasks">
       {arrayList.map((item, index) => (
          <section key={index} id='buttons-section'>
              <span id="textTask">{item}</span>
              <Button  variant="warning" className="span-gapping" id="editButton" onClick={() => Edit(item)}>Editar</Button>
              <Button  variant="danger" className="span-gapping" id="deleteButton" onClick={() => Delete(item)}>Excluir</Button>
          </section>
         ))}
      </div>
    </>
  )
}

export default App
