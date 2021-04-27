export default class StateManagement {
    constructor(worklog, instanceController, url) {
        this.worklog = worklog;
        this.instanceController = instanceController;
        this.url = 'ws://localhost:8080/ws';
    }

    init() {
        const ws = new WebSocket(this.url);
        this.sendNewInstanceRequest(ws);

        ws.addEventListener('message', (evt) => {
            const data = JSON.parse(evt.data);
            const {type} = data

            switch(type) {
                case 'received':
                    this.worklog.createWorklogMessage(data.date, data.id, data.info);
                    
                    break;

                case 'created':
                    this.instanceController.createInstance(data.id, () => this.toggleListener(ws, data.id), () => this.sendDeleteRequest(ws, data.id));
                    
                    break;
                
                case 'deleted':
                    this.instanceController.deleteInstance(data.id);
                    this.worklog.createWorklogMessage(data.date, data.id, data.info);
                    
                    break;

                case 'started':
                    this.worklog.createWorklogMessage(data.date, data.id, data.info);
                    this.changeStatusAndIcon(data.id, 'Running','&#10074;&#10074;');
                    
                    break

                case 'stopped':
                    this.worklog.createWorklogMessage(data.date, data.id, data.info);
                    this.changeStatusAndIcon(data.id, 'Stopped','&#9654;');

                    break    
                    
                case 'error':
                    this.worklog.createWorklogMessage(data.date, data.id, data.info);
                    
                    break;
            }
        });
    }

    changeStatusAndIcon(id, status, toggle) {
        const parent = document.getElementById(id);
        const statusElement = parent.getElementsByClassName('instance__statusDescription').item(0);
        const statusIcon = parent.getElementsByClassName('instance__icon').item(0);
        statusIcon.classList.toggle('color-green');
        statusElement.innerText = status;
        const toggleElement = parent.getElementsByClassName('instance__toggle').item(0);
        toggleElement.innerHTML = toggle;
    }
    
    sendStartRequest(ws, id) {
        ws.send(JSON.stringify({
            id,
            type:'start'
        }));  
    }

    sendStopRequest(ws, id) {
        ws.send(JSON.stringify({
            id,
            type:'stop'
        }));  
    }

    toggleListener(ws, id) {
        const parent = document.getElementById(id);
        const statusElement = parent.getElementsByClassName('instance__statusDescription').item(0);
        const statusDescription = statusElement.innerText;
        
        if(statusDescription === 'Stopped') {
            this.sendStartRequest(ws, id);
        } else if(statusDescription === 'Running') {
            this.sendStopRequest(ws, id);
        }
    }
    
    sendDeleteRequest(ws, id) {
        ws.send(JSON.stringify({
            id,
            type:'delete'            
        }));
    }
    
    sendNewInstanceRequest(ws) {
        this.instanceController.instanceButtonCreate.addEventListener('click', () => { 
            ws.send(JSON.stringify({type: 'instances'}));
        });
    }
}










// export default class StateManagement {
//     constructor(worklog, instanceController, url) {
//         this.worklog = worklog;
//         this.instanceController = instanceController;
//         this.url = url;
//     }

//     init() {
//         this.newInstanceListener();
//         // this.startCloudServer();
//     }

//     closeStream(stream) {
//         stream.close();
//     }
    
//     callbackToggle() {
//         //проверить this.url
//         const eventSource = new EventSource(`http://localhost:8080/start`);
        
//         eventSource.addEventListener('started', (evt) => {
//             console.log(evt.data);
//         });
//     }
    
//     newInstanceListener() {
//         this.instanceController.instanceButtonCreate.addEventListener('click', () => { 
//             const eventSource = new EventSource(`${this.url}instances`);
//             eventSource.addEventListener('received', (evt) => {
//                 const data = JSON.parse(evt.data);
//                 this.worklog.createWorklogMessage(data.date, data.id, data.info);
//             });

//             eventSource.addEventListener('created', (evt) => {
//                 const data = JSON.parse(evt.data);
//                 this.worklog.createWorklogMessage(data.date, data.id, data.info);
//                 const callbackDel = () => console.log('del');
              
//                 this.instanceController.createInstance(data.id, callbackDel, this.callbackToggle);
                
//                 this.closeStream(eventSource)
//             });  
//         });
//     }
// }