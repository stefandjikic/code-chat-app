// render chat to the DOM
// clear chat when switch room

class ChatsView{
  constructor(list){
    this.list = list;
  }
  render(data){
    const html = `
      <li>
        <span class="username">${data.username}:</span>
        <span class="message">${data.message}</span>
        <div class="time">${data.created.toDate()}</div>
      </li>
    `;
    this.list.innerHTML += html;
  }
}