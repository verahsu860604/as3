import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const todoKey = 'todos';
// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function listTodos(unaccomplishedOnly = false, searchText = '', start) {
    
    let url = `${postBaseUrl}/todos`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (unaccomplishedOnly)
         query.push(`unaccomplishedOnly=${unaccomplishedOnly}`);       
    if (start)
         query.push(`start=${start}`);
    if (query.length)
        url += '?' + query.join('&');

     

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        
        return res.data;
    });
}

export function createTodo(mood, text) {
    let url = `${postBaseUrl}/todos`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
    let url = `${postBaseUrl}/todos/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

// export function listTodos(unaccomplishedOnly = false, searchText = '') {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(_listTodos(unaccomplishedOnly, searchText));
//         }, 500);
//     });
// }

// Simulated server-side code
// function _listTodos(unaccomplishedOnly = false, searchText = '') {
//     let todoString = localStorage.getItem(todoKey);
//     let todos = todoString ? JSON.parse(todoString) : [];

//     if (unaccomplishedOnly) {
//         todos = todos.filter(t => {
//             return !t.doneTs;
//         });
//     }
//     if (searchText) {
//         todos = todos.filter(t => {
//             return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
//         });
//     }
//     return todos;
// };

// export function createTodo(mood, text) {
//     return new Promise((resolve, reject) => {
//         resolve(_createTodo(mood, text));
//     });
// }

// Simulated server-side code
// function _createTodo(mood, text) {
//     const newTodo = {
//         id: uuid(),
//         mood: mood,
//         text: text,
//         ts: moment().unix(),
//         doneTs: null
//     };
//     const todos = [
//         newTodo,
//         ..._listTodos()
//     ];
//     localStorage.setItem(todoKey, JSON.stringify(todos));

//     return newTodo;
// }

// export function accomplishTodo(id) {
//     return new Promise((resolve, reject) => {
//         _accomplishTodo(id);
//         resolve();
//     });
// }

// Simulated server-side code
// function _accomplishTodo(id) {
//     let todos = _listTodos();
//     for(let t of todos) {
//         if(t.id === id) {
//             t.doneTs = moment().unix();
//             break;
//         }
//     }
//     localStorage.setItem(todoKey, JSON.stringify(todos));
// }
