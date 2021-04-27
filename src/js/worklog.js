export default class Worklog {
    constructor() {
        this.worklog = document.getElementsByClassName('worklog__list').item(0);
        
    }

    createWorklogMessage(date, id, info) {
        this.worklog.insertAdjacentHTML('beforeEnd', `
            <li class="woklog__item item">
                <time class="woklog__time">${date}</time>
                <span class="woklog__id">Server: ${id}</span>
                <span class="woklog__info">INFO: ${info}</span>
            </li>
        `);
    }
}