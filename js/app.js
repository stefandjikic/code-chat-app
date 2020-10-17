// DOM
const chatList = document.querySelector('.chat-list');
const newMessageForm = document.querySelector('.new-message');

// add new chat on submit
newMessageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newMessageForm.message.value.trim();
  console.log(message);
  //zovemo asinhronu newChat f-ju
  chatroom.newChat(message)
  .then(()=>newMessageForm.reset())
  .catch(err => console.log(err));
});

// class instances
const chatView = new ChatsView(chatList);
const chatroom = new Chatroom('general', 'user');

// get chats and render
chatroom.getChats((data) => {
  // prosledjujemo kao argument ovu cb funkciju getChats f-ji
  // console.log(data);
  chatView.render(data);
})