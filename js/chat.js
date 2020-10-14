class Chatroom {
  constructor(chatroom, username) {
    this.chatroom = chatroom;
    this.username = username;
    this.chats = db.collection('chats');
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
    this.chats.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          //update view
          callback(change.doc.data())
        }
      });
    });
  }
}

const chatroom = new Chatroom('css', 'Mirko');
// console.log(chatroom);

// newChat je asinhrona f-ja, vraca promisu.
// chatroom.newChat("Pozdrav svima!!!")
// .then(() => console.log('chat added'))
// .catch(err => console.log(err));

chatroom.getChats((data) => {
  // prosledjujemo kao argument ovu cb funkciju getChats f-ji
  console.log(data);
})