// DOM
const chatList = document.querySelector('.chat-list');

// class instances
const chatView = new ChatsView(chatList);
const chatroom = new Chatroom('general', 'Mirko');

// get chats and render
chatroom.getChats((data) => {
  // prosledjujemo kao argument ovu cb funkciju getChats f-ji
  // console.log(data);
  chatView.render(data);
})