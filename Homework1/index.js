const view = {
    Start: () => {
        console.log("hello")
        if (model.checkLocal() === false) {
            let array = JSON.parse(localStorage.getItem('ListTask'))
            console.log(array)
            for (let i = 0; i < array.length; i++) {
                view.showTasks(array[i].nameTask);
            }
        }
        const addTask = document.querySelector('.form-add');
        addTask.addEventListener('submit', (event) => {
            event.preventDefault()
            let newTask = addTask.task.value;
            controller.addTask(newTask);
            addTask.task.value = ''
        })
        const clear = document.querySelector('.clear')
        clear.addEventListener('click', () => {
            console.log('hello');
            localStorage.clear();
            location.reload();
        })
        const filter = document.querySelector('#search')
        filter.addEventListener('click', () =>{
            if (model.checkLocal() === false) {
                let array = JSON.parse(localStorage.getItem('ListTask'))
                let filterT = document.querySelector('.filter').value
                for (let i = 0; i < array.length; i++) {
                    if(filterT === array[i].nameTask)
                    view.showTasks(array[i].nameTask);
                }
            }else{
                view.messageError("error_filter", 'No Task!!!!!')
            }
        })
        

    },
    messageError: (className,str) => {
        console.log(className)
        document.querySelector("."+className).textContent = str
    },
    showTasks: (newTask) => {
        let raw = document.createElement('li')
        raw.innerHTML = `<li type="circle"><span>${newTask}</span></li>`

        document.querySelector('.listTask').appendChild(raw)

    }

}
const controller = {
    addTask: (newTask) => {
        if (newTask === '') {
            view.messageError("error",'you need to input task !!!!!')
        } else {
            view.messageError("error",'')
        }
        if (newTask !== '') {
            model.addTask(newTask);
        }
    }
}

const model = {
    arrayListTask: [],

    addTask: (newTask) => {
        if (model.checkLocal() === true) {
            console.log('no')
            localStorage.setItem('ListTask', JSON.stringify(model.arrayListTask));
        } else {
            console.log('yes')
            model.arrayListTask = JSON.parse(localStorage.getItem('ListTask'))
        }
        console.log(model.arrayListTask)
        let newT = {
            id: model.arrayListTask.length,
            nameTask: newTask,
        }
        model.arrayListTask.push(newT)
        console.log(model.arrayListTask)
        localStorage.setItem('ListTask', JSON.stringify(model.arrayListTask));
        view.showTasks(newT.nameTask)
    },
    checkLocal: () => {
        let checkE = localStorage.getItem('ListTask');
        if (checkE === null) {
            return true;
        } else {
            return false;
        }
    }
}
view.Start();