class Chatroom {
  constructor(chatroom, username) {
    this.chatroom = chatroom;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }

  // kreiramo chat objekat
  async newChat(message){
    const date = new Date();
    const chat = {
      message:message,
      username: this.username,
      chatroom:this.chatroom,
      created: firebase.firestore.Timestamp.fromDate(date)
    };
    // storujemo chat u bazu
    const response = await this.chats.add(chat);
    return response;
  }

  // postavljanje real-time listenera koji treba da vrati response svaki put kad se desi promena
  // onSnapshot metoda firebase-a.
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
  }

  updateChatroom(chatroom){
    this.chatroom = chatroom;
    console.log('Room Updated!');
    if(this.unsub){
      this.unsub();
    }
  }
}

// newChat je asinhrona f-ja, vraca promisu.
// chatroom.newChat("Pozdrav svima!!!")
// .then(() => console.log('chat added'))
// .catch(err => console.log(err));



// updating the room
// setTimeout(()=>{
//   chatroom.updateChatroom('react');
//   chatroom.updateUsername('rasha')
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.newChat('Hello')
// }, 3000);
