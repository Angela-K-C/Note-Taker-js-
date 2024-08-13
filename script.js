document.addEventListener("DOMContentLoaded", () => {
    	let myTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        renderTasks(myTasks);

        document.querySelector('#push').onclick = function () {
            const inputElement = document.querySelector('#newtask input');
            
            if(inputElement.value.length === 0){
                alert('Please enter text')
            } else {
                myTasks.push({text: inputElement.value, completed: false});
                localStorage.setItem('tasks', JSON.stringify(myTasks));
                renderTasks(myTasks);
                inputElement.value = '';
            }
        };

        function renderTasks(tasks) {
            const taskContainer = document.querySelector('#tasks');
            taskContainer.innerHTML = '';

            tasks.forEach((task, index) => {

                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                if(task.completed){
                    taskDiv.classList.add('completed');
                }

                const taskName = document.createElement('span');
                taskName.id = 'taskname';
                taskName.textContent = task.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete');
                deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
                deleteBtn.onclick = function () {
                    myTasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(myTasks));
                    renderTasks(myTasks);
                };

                taskDiv.onclick = function () {
                    myTasks[index].completed = !myTasks[index].completed;
                    localStorage.setItem('tasks', JSON.stringify(myTasks));
                    renderTasks(myTasks);
                };

                taskDiv.appendChild(taskName);
                taskDiv.appendChild(deleteBtn);
                taskContainer.appendChild(taskDiv);
                
            });
        }

})