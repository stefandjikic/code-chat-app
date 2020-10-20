// DOM
const chatList = document.querySelector('.chat-list');
const newMessageForm = document.querySelector('.new-message');
const newUsernameForm = document.querySelector('.new-username');
const updateMsg = document.querySelector('.update-msg');
const user_name = document.getElementById('user_name');
const rooms = document.querySelector('.chat-rooms');
const activeRoom = document.querySelector('.active-room');
const settingsBtn = document.querySelector('.settings-heading');
const settings = document.querySelector('.display-toggle');
const dropIcon = document.querySelector('.settings-icon');
const darkModeBtn = document.querySelector('.dark-toggle-btn');
const chatWindow = document.querySelector('.chat-window');

// add new chat on submit
newMessageForm.addEventListener('submit', e => {
  e.preventDefault();
  if(newMessageForm.message.value === ''){
    alert('Write Something');
  } else{
    const message = newMessageForm.message.value.trim();
    // console.log(message);
    //zovemo asinhronu newChat f-ju
    chatroom.newChat(message)
    .then(()=>{
      newMessageForm.reset();
      chatWindow.scrollTop = chatWindow.scrollHeight;
     })
    .catch(err => console.log(err));
    // chatWindow.scrollTop = chatWindow.scrollHeight;
  }

});

// check ls for a name
const usernameLs = localStorage.username ? localStorage.username : 'User';
user_name.innerText = usernameLs;

// update username
newUsernameForm.addEventListener('submit', e =>{
  e.preventDefault();
  const newUsername = newUsernameForm.name.value.trim();
  if(newUsernameForm.name.value === ''){
    updateMsg.innerText = 'Please enter something';
    setTimeout(()=>updateMsg.innerText = '',1000);
    user_name.innerText = `${newUsername}`;
  } else{
    chatroom.updateUsername(newUsername);
    // clear input
    newUsernameForm.reset();
    //show update
    updateMsg.innerText = 'Username updated!';
    setTimeout(()=>updateMsg.innerText = '',2000);
    user_name.innerText = `${newUsername}`;
  }
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
});

settingsBtn.addEventListener('click', ()=>{
  settings.classList.toggle('d-show');
  dropIcon.classList.toggle('rotate');
});

// Toggle dark mode

let lightMode = localStorage.getItem('lightMode');

const enableLightMode = () => {
  document.body.classList.add('lightmode');
  localStorage.setItem('lightMode', 'enabled');
  darkModeBtn.innerHTML = "ON"
};

const enableDarkMode = () => {
  document.body.classList.remove('lightmode');
  localStorage.setItem('lightMode', null);
  darkModeBtn.innerHTML = "OFF"
};

if(lightMode === 'enabled'){
  enableLightMode();
}

darkModeBtn.addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode');
  if(lightMode !== 'enabled'){
    enableLightMode();
  } else {
    enableDarkMode();
  }
});
 
