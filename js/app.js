// DOM
const chatList = document.querySelector('.chat-list');
const newMessageForm = document.querySelector('.new-message');
const newUsernameForm = document.querySelector('.new-username');
const updateMsg = document.querySelector('.update-msg');
const user_name = document.getElementById('user_name');
const rooms = document.querySelector('.chat-rooms');
const activeRoom = document.querySelector('.active-room');
const settingsBtn = document.querySelector('.settings-heading');

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

// check ls for a name
const usernameLs = localStorage.username ? localStorage.username : 'User';
user_name.innerText = usernameLs;

// update username
newUsernameForm.addEventListener('submit', e =>{
  e.preventDefault();
  const newUsername = newUsernameForm.name.value.trim();
  chatroom.updateUsername(newUsername);
  // clear input
  newUsernameForm.reset();
  //show update
  updateMsg.innerText = 'Username updated!';
  setTimeout(()=>updateMsg.innerText = '',2000);
  user_name.innerText = `${newUsername}`;
});

// update the chatroom
rooms.addEventListener('click', e => {
  // console.log(e);
  if(e.target.tagName === 'LI'){
    chatView.clearChat();
    chatroom.updateChatroom(e.target.getAttribute('id'));
    // id je value sobe koju smo kliknuli; Prsoledjujemo ga kao argument metodi updateChatroom();
    activeRoom.innerHTML = e.target.getAttribute('id');
    //pozvati getChats() i proslediti cb f-ju koja renderuje chat iz nove sobe.
    chatroom.getChats(chat => chatView.render(chat));
  };
});

// class instances
const chatView = new ChatsView(chatList);
const chatroom = new Chatroom('general', usernameLs);
console.log(chatroom);

// get chats and render
chatroom.getChats((data) => {
  // prosledjujemo kao argument ovu cb funkciju getChats f-ji
  // console.log(data);
  chatView.render(data);
})