// render chat to the DOM
// clear chat when switch room

class ChatsView{
  constructor(list){
    this.list = list;
  }
  render(data){
    const sent = moment(
      data.created.toDate()
    )
    .startOf()
    .fromNow();
    const html = `
      <li>
        <span class="username">${data.username}:</span>
        <span class="message">${data.message}</span>
        <div class="time">${sent}</div>
      </li>
    `;
    this.list.innerHTML += html;
  }
  clearChat(){
    this.list.innerHTML = '';
  };
}
