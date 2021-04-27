export default class InstanceController {
    constructor() {
        this.instanceButtonCreate = document.getElementsByClassName('instance__button').item(0);
        this.instanceList = document.getElementsByClassName('instance__list').item(0);
        this.instanceToggle = document.getElementsByClassName('instance__toggle').item(0);
        this.instanceButtonDelete = document.getElementsByClassName('instance__delete').item(0);
        this.instanceIcon = document.getElementsByClassName('instance__icon').item(0);
        this.instanceStatusDescription = document.getElementsByClassName('instance__statusDescription').item(0);
        this.instanceID = document.getElementsByClassName('instance__id').item(0);
    }

    createInstance(id, callbackToggle, callbackDelete) {
        const li = document.createElement('li');
        li.classList.add('instance__item');
        li.id = id;
        li.insertAdjacentHTML('beforeEnd', `
            <span class="instance__id">${id}</span>
            <div class="instance__status">
                <span>Status:</span>
                <span class="instance__icon">&#11044;</span>
                <span class="instance__statusDescription">Stopped</span>
            </div>
        `);

        const div = document.createElement('div');
        div.classList.add('instance__actions');

        const span = document.createElement('span');
        span.innerText = 'Actions:';
        
        const buttonToggle = document.createElement('button');
        buttonToggle.innerHTML = '&#9654;';
        buttonToggle.classList.add('instance__toggle');
        buttonToggle.addEventListener('click', callbackToggle)
        
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = '&#10006;'
        buttonDelete.classList.add('instance__delete');
        buttonDelete.addEventListener('click', callbackDelete)
        
        div.append(span, buttonToggle, buttonDelete);
        li.append(div);
        this.instanceList.appendChild(li);
    }

    deleteInstance(instanceID) {
        document.getElementById(instanceID).remove();
    }   
}


