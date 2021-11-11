class Chatroom {
  constructor(chatroom, username) {
    this.chatroom = chatroom;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }

  async newChat(message){
    const date = new Date();
    const chat = {
      message:message,
      username: this.username,
      chatroom:this.chatroom,
      created: firebase.firestore.Timestamp.fromDate(date)
    };
    // store chat
    const response = await this.chats.add(chat);
    return response;
  }

  //real-time listener -returns response on change
  getChats(callback){
    this.unsub = this.chats
    .where('chatroom','==', this.chatroom)
    .orderBy('created')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          //update view
          callback(change.doc.data())
        }
      });
    });
  }

  updateUsername(username){
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateChatroom(chatroom){
    this.chatroom = chatroom;
    console.log('Room Updated!');
    if(this.unsub){
      this.unsub();
    }
  }
}

