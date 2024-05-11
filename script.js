let createBtn = document.getElementById('create-task');
createBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // getting values entered by the user
    var lastDate = document.querySelector('.date');
    var task = document.querySelector('.msg');

    // create <li> items
    if (task.value === '' || lastDate.value === '') {
        alert('field empty');
    } else {
        let listItem = document.createElement("li");
        listItem.className = 'items';
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = 'check';
        let dateLabel = document.createElement('label');
        let currDate = new Date();
        let deadline = new Date(lastDate.value);
        let dateMS = deadline - currDate;
        dateLabel.innerText = Math.floor(dateMS / (1000 * 60 * 60 * 24));
        dateLabel.className = 'date';
        localStorage.setItem(`D${Math.floor(dateMS / (1000 * 60 * 60 * 24))}`, task.value);
        let taskLabel = document.createElement('label');
        taskLabel.innerText = task.value;
        let delBtn = document.createElement('button');
        delBtn.className = 'delete-task';
        delBtn.innerText = "X";

        // for deletion of node if clicked
        delBtn.onclick = function () {
            let key = `D${this.parentNode.querySelector('.date').innerText}`;
            localStorage.removeItem(key);
            this.parentNode.remove();
        }

        checkBox.addEventListener('change', function(){
            if(this.checked){
                taskLabel.style.textDecoration = 'line-through';
            } else {
                taskLabel.style.textDecoration = 'none';
            }
        })

        // adding <input>, <label>, <button> to the <li>
        listItem.appendChild(checkBox);
        listItem.appendChild(dateLabel);
        listItem.appendChild(taskLabel);
        listItem.appendChild(delBtn);

        // adding the <li> to the <ul>
        document.querySelector('.list-of-tasks').prepend(listItem);

        // after creating the node input fields must be clear again
        lastDate.value = '';
        task.value = '';
    }
});

// basically when the page reloads all datas are stored in local storage but I have to show them as a <li> item in page so this event is added
window.addEventListener('load', function(){
    // searches for those key value pairs in the local storage which are added by me
    for(let i = 0; i < this.localStorage.length; i++){
        let key = this.localStorage.key(i);
        // if the key conains "D" at first position then it is a key value pair to be showed in the window
        if(key.charAt(0) === "D"){
            // again we have to create the <li> elements
            let listItem = document.createElement("li");
            listItem.className = 'items';

            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.className = 'check';

            let dateLabel = document.createElement('label');
            dateLabel.innerText = key.substring(1);
            dateLabel.className = 'date';

            let taskLabel = document.createElement('label');
            taskLabel.innerText = this.localStorage[key];

            let delBtn = document.createElement('button');
            delBtn.className = 'delete-task';
            delBtn.innerText = "X";

            // adding functionality to the button and check-box
            delBtn.onclick = function () {
                let key = `D${this.parentNode.querySelector('.date').innerText}`;
                localStorage.removeItem(key);
                this.parentNode.remove();
            }
    
            checkBox.addEventListener('change', function(){
                if(this.checked){
                    taskLabel.style.textDecoration = 'line-through';
                } else {
                    taskLabel.style.textDecoration = 'none';
                }
            })

            listItem.appendChild(checkBox);
            listItem.appendChild(dateLabel);
            listItem.appendChild(taskLabel);
            listItem.appendChild(delBtn);

            document.querySelector('.list-of-tasks').prepend(listItem);
        }
    }
})