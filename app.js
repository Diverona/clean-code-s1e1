//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput=document.getElementById("new-task");//Add a new task.
let addButton=document.querySelector('.add-task__button');//first button
let incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
let completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");

    //input (checkbox)
    let checkBox=document.createElement("input");//checkbx
    //label
    let label=document.createElement("label");//label
    //input (text)
    let editInput=document.createElement("input");//text
    //button.edit
    let editButton=document.createElement("button");//edit button

    //button.delete
    let deleteButton=document.createElement("button");//delete button
    let deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    listItem.classList='task-item';
    checkBox.className='checkbox-input';
    label.className='task-label task-label_edit';

    //Each elements, needs appending
    
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task-input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="task-button";

    deleteButton.className="delete-button";
    deleteButtonImg.className='delete-button__img';
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask=function(){
    
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';

}

//Edit an existing task.

let editTask=function(){
    let listItem=this.parentNode;

    let tasksList = listItem.parentNode;

    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector(".task-label");
    
    let editBtn=listItem.querySelector(".task-button");
    let containsClass=listItem.classList.contains("edit-mode");
    
    //If class of the parent is .editmode
    if(containsClass){ 
      if (tasksList.id === 'completed-tasks') {
        label.className = 'task-label task-label_edit task-label_completed';
      } else {
        label.className = 'task-label task-label_edit';
      }
        //switch to .editmode
        //label becomes the inputs value.
        
        editInput.className = 'task-input';
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
      label.className = 'task-label task-label_save';
      editInput.className = 'type-text-input'; 

        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");

};


//Delete task.
let deleteTask=function(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    let listItem=this.parentNode;
    let label=listItem.querySelector(".task-label");
    let editInput=listItem.querySelector('input[type=text]');
    let editBtn=listItem.querySelector(".task-button");
    label.className = 'task-label task-label_edit task-label_completed';
    editInput.className = 'task-input';
    editBtn.innerText="Edit";
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem=this.parentNode;
  let label=listItem.querySelector(".task-label");
  let editInput=listItem.querySelector('input[type=text]');
  label.className = 'task-label task-label_edit';
  editInput.className = 'task-input';
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



let ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
// addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    let checkBox=taskListItem.querySelector(".checkbox-input");
    let editButton=taskListItem.querySelector(".task-button");
    let deleteButton=taskListItem.querySelector(".delete-button");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.