var ChatApp = window.React.createClass({
    getInitialState:function(){
      return {
          messages: [],
          socket: window.io('http://localhost:3000')
      }
    },
    componentDidMount: function(){
        var self = this;
        this.state.socket.on("receive-message", function(msg){
            var messages = self.state.messages;
                messages.push(msg);
            self.setState({messages: messages});
            console.log(self.state.messages);
        });
    },
    submitMessage: function(){
      var message = document.getElementById("message").value;
      this.state.socket.emit("new-message",message);
    },
   render: function(){
       var self = this;
       var messages = self.state.messages.map(function(msg){
           return <li>{msg}</li>
       });
          return(
           <div>
               <ul>
                   {messages}
               </ul>
               <input id="message" type="text"/><button onClick={() => self.submitMessage()}></button>
            </div>
       )
   }
});

window.ReactDOM.render(
  <ChatApp/>,
      document.getElementById("chat")
);