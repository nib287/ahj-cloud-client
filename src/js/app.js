import '../css/style.css';
import StateManagement from './stateManagement.js';
import Worklog from './worklog.js';
import InstanceController from './instanceController.js';

const worklog = new Worklog()
const instanceController = new InstanceController();
const stateManagement = new StateManagement(worklog, instanceController, 'http://localhost:8080/');

stateManagement.init();