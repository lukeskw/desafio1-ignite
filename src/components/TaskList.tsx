import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle){
      const newTask = {
        id: Math.floor(Math.random() * 10000) + 1,
        title: newTaskTitle,
        isComplete: false,
      }


     // console.log(newTask)
      setTasks ((prevState) => [...prevState, newTask])
      
    }
  }

  function handleToggleTaskCompletion(id: number) {
   // console.log(tasks)
    //console.log(
      const newTask = tasks.map( task =>{
        if (task.id === id){
          const changedTask = {
                id:task.id,
                title: task.title,
                isComplete : (task.isComplete) ? false : true
          }
          return changedTask
        }
        else {
          const originalTask = {
            id: task.id,
            title: task.title,
            isComplete: task.isComplete
          }
          return originalTask
        }
     
      })
      console.log(newTask)
      setTasks(newTask)
    //   const tk = {
    //     id: filterTask[0].id,
    //     title: filterTask[0].title,
    //     isComplete : (filterTask[0].isComplete) ? false : true
    //   }
    //   const tasksWithoutFiltered = tasks.filter( task => {
    //     console.log('filter', filterTask[0].id, 'task', task.id)
    //     return task.id !== filterTask[0].id
    //   })
    //  setTasks([tasksWithoutFiltered[0], tk])
    //   tasks.map( task => { 
        
    //   //   if(task.id === id){
    //   //     const tk = {
    //   //     ...task,
    //   //     isComplete: (task.isComplete) ? false : true,
    //   //   }
    //   //   setTasks(() => [tk])
    //   // }
      
    // })
    //);

    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const removeTask = tasks.filter( task => {
      return task.id !==id
    })
    //console.log(removeTask)
    setTasks(removeTask)
  }
  function clearInput(e) {
    e.preventDefault();
    document.getElementById("myForm").reset()
  
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
        <form id="myForm">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            id ="todo-input"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            // value=//{newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={(e)=> {handleCreateNewTask() ; clearInput(e)}}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
          </form>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}