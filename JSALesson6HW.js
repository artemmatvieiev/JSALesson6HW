/* 1. Используя копию планка, в script.js создать асинхронную функцию, в которой выполнить запрос к файлу structure.json.
Полученная структура содержит объект вида
{ html: …, styles: … }
Добавить html и стили на страницу.

Стили можно добавить следующим образом:
const style = document.createElement('style');
style.textContent ='some styles is here';
document.body.appendChild(style); */

https://plnkr.co/edit/IictP7svnEYy2ls6AcoH?p=preview

const getFile = async () => {
  const response = await fetch("structure.json");
  const jsonResponse = await response.json();
  return jsonResponse;
}

getFile().then(data => {
  const content = document.createElement('div');
  content.innerHTML = data.html;
  document.body.appendChild(content);
  const style = document.createElement('style');
  style.textContent = data.styles;
  document.body.appendChild(style);
});


/* 2.С помощью async функции и fetch() выполнить get запрос к ресурсу.
Из полученного массива построить список юзеров, имеющий вид:

“Пользователь userID=1 имеет 5 завершенных и 6 не завершенных заданий”
“Пользователь userID=2 имеет 3 завершенных и 7 не завершенных заданий”
“Пользователь userID=3 имеет 8 завершенных и 2 не завершенных заданий”
…

Список должен выводиться на страницу в виде ul. */

https://plnkr.co/edit/80brDjmVHHeHCW0iEa1B?p=preview

const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return todos;
} 

const drawResult = async () => {
  const todos = await getTodos();
  const allUserId = [];
  todos.forEach( (todo) => { allUserId.push(todo.userId) } );
  const uniqueUserId = allUserId.filter(function(item, pos) {
    return allUserId.indexOf(item) == pos;
  });
  const result =[];
  for (let id of uniqueUserId) {
    const user = {userId:id, res:0, notRes: 0};
    todos.filter((todo) => todo.userId == id)
      .forEach((todo) => {
        if (todo.completed) user.res++
          else user.notRes++
      });
    result.push(user);
  }
  
  const ul = document.createElement('ul');
  ul.innerHTML = result.map( user => 
    `<li>Пользователь userID=${user.userId} имеет ${user.res} завершенных и ${user.notRes} не завершенных заданий</li>`)
    .join('');
  document.body.appendChild(ul);
}

drawResult();

/* 3.Подключить jQuery и, используя сервис jsonplaceholder, создать функцию, которая сделает POST запросы для добавления любого количества юзеров (примеры там же). 
Каждый успешный запрос будет возвращать ответ в виде созданного юзера (объект с дополнительными полем id).
После последнего запроса показать информацию о всех юзерах на странице (использовать codepen или любой другой онлайн-редактор).

createUsers([{name: 'Vasya', age: 25}, {name: 'Petya', age: 40}]);

При использовании codepen или другого ресурса с httpS, запрос следует слать на тот же протокол httpS https://jsonplaceholder.typicode.com/users
*/

https://plnkr.co/edit/EG6nY6r7xQORA12ttd9M?p=preview

const createUsers = async (users = []) => {
  const newUsers = await Promise.all(
    users.map( data =>
      $.ajax('https://jsonplaceholder.typicode.com/users', { method: 'POST', data })
    )
  );
  const ul = document.createElement('ul');
  ul.innerHTML = newUsers.map( user => 
    `<li>Name:${user.name}  Age:${user.age}</li>`)
    .join('');
  document.body.appendChild(ul);
};

createUsers([{name: 'Artem', age: 30}, {name: 'Igor', age: 32}])