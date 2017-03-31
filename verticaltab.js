var ChatApp2 = window.React.createClass({
    getInitialState:function(){
        return {
            messages: [],
            socket: window.io('http://localhost:3000')
        }
    },
    componentDidMount: function(){
        var self = this;
        this.state.socket.on("infolog-message", function(msg){
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages});
        });
    },
    render: function(){
        var self = this;
        var messages = self.state.messages.map(function(msg){
            console.log(msg);
            var log = JSON.parse(msg);
            var message =  log.name + " | " + log.msg + " | " + log.time;
            return <li>{message}</li>
        });
        return(
            <div>
                <ul>
                    {messages}
                </ul>
            </div>
        )
    }
});

var ChatApp3 = window.React.createClass({
    getInitialState:function(){
        return {
            messages: [],
            socket: window.io('http://localhost:3000')
        }
    },
    componentDidMount: function(){
        var self = this;
        this.state.socket.on("errorlog-message", function(msg){
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages});
            console.log(self.state.messages);
        });
    },
    render: function(){
        var self = this;
        var messages = self.state.messages.map(function(msg){
            var log = JSON.parse(msg)
            var message = log.msg
            return <li>{message}</li>
        });
        return(
            <div>
                <ul>
                    {messages}
                </ul>
            </div>
        )
    }
});

var ChatApp4 = window.React.createClass({
    getInitialState:function(){
        return {
            messages: [],
            socket: window.io('http://localhost:3000')
        }
    },
    componentDidMount: function(){
        var self = this;
        this.state.socket.on("debuglog-message", function(msg){
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages});
        });
    },
    render: function(){
        var self = this;
        var messages = self.state.messages.map(function(msg){
            var log = JSON.parse(msg)
            var message = log.msg
            return <li>{message}</li>
        });
        return(
            <div>
                <ul>
                    {messages}
                </ul>
            </div>
        )
    }
});

var VerticalTab = React.createClass({
        render: function(){
            return (
                <div className="row">
                    <div className="col-md-12">
                    <div className="tabbable">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href="#a" data-toggle="tab">{this.props.chat1}</a></li>
                            <li><a href="#b" data-toggle="tab">{this.props.chat2}</a></li>
                            <li><a href="#c" data-toggle="tab">{this.props.chat3}</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="a">
                                <ChatApp2/>
                            </div>
                            <div className="tab-pane" id="b">
                                <ChatApp3/>
                            </div>
                            <div className="tab-pane" id="c">
                                <ChatApp4/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
})

ReactDOM.render(
    <VerticalTab chat1="Info" chat2="Error" chat3="Debug"/>,
    document.getElementById("verticalTab")
);