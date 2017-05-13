var dateConvert = {
    formattedDate: '',
    formatDateForDb: function (date) {
        var newDate = new Date(date);
        var day = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var seconds = newDate.getSeconds();
        if (newDate.getHours().toString().length < 2)
            hours = "0" + hours;

        if (newDate.getMinutes().toString().length < 2)
            minutes = "0" + minutes;

        if (newDate.getSeconds().toString().length < 2)
            seconds = "0" + seconds;

        if (month.toString().length < 2)
            month = "0" + month;

        if (day.toString().length != 2) {
            day = '0' + day;
        }
        this.formattedDate = newDate.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        return this.formattedDate;
    },
}

var ChatApp2 = window.React.createClass({
    getInitialState:function(){
        return {
            messages: [],
            socket: window.io('http://ec2-13-228-23-4.ap-southeast-1.compute.amazonaws.com:3000')
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
        var prev = ''
        var messages = self.state.messages.map(function(msg){
            if(msg != prev)
            {
                var log = JSON.parse(msg);
                var message = '';

                if (log.msg == ''){
                    if (log.message == ''){
                        if (log.function){
                            message = log.function;
                        } else {
                            if (log.job_name){
                                message = log.job_name;
                            } else
                                message = '';
                        }
                    } else
                        message = log.message;
                } else
                    message = log.msg;

                prev = msg
                return <li>{message}</li>
            }

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
            socket: window.io('http://ec2-13-228-23-4.ap-southeast-1.compute.amazonaws.com:3000')
        }
    },
    componentDidMount: function(){
        var self = this;
        this.state.socket.on("errorlog-message", function(msg){
            var messages = self.state.messages;
            messages.push(msg);
            self.setState({messages: messages});
        });
    },
    render: function(){
        var self = this;
        var prev = ''
        var messages = self.state.messages.map(function(msg){
            if(msg != prev) {
                var log = JSON.parse(msg)
                //var message = log.msg
                var message = '';
                if (log.user) {
                    //message = log.name + " | " + log[0].user + " | " + log[0].date + " | " + log[0].function + " | " + log[0].sql + " | " + log[0].runtime;
                    message = log.name + " | User ID: " + log.user + " | Date: " + log.date + " | Error: " + log.error + " | Function: " + log.function + " | SQL: " + log.sql + " | Parameters: " + log.params;
                } else {
                    if (log.function) {
                        message = log.name + " | Date: " + log.date + " | Error: " + log.error + " | Function: " + log.function + " | SQL: " + log.sql + " | Parameters: " + log.params;
                    } else
                        message = log.msg
                }

                prev = msg
                return <li>{message}</li>
            }
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
            socket: window.io('http://ec2-13-228-23-4.ap-southeast-1.compute.amazonaws.com:3000')
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
        var prev = '';
        var messages = self.state.messages.map(function(msg){
            if(prev != msg)
            {
                var log = JSON.parse(msg)
                var message = '';

                var datetime = dateConvert.formatDateForDb(log.time);
                if (log.user){
                    //message = log.name + " | " + log[0].user + " | " + log[0].date + " | " + log[0].function + " | " + log[0].sql + " | " + log[0].runtime;
                    message = log.name + " | User ID: " + log.user + " | Date: " + log.date + " | Function: " + log.function + " | SQL: " + log.sql + " | Runtime: " + log.runtime;
                } else {
                    if (log.msg == ''){
                        if (log.function){
                            message = log.name + " | " + log.function + " | " + datetime;
                        } else
                            message = log.name + " | " + log.msg + " | " + datetime;
                    } else
                        message = log.name + " | " + log.msg + " | " + datetime;
                }
                prev = msg;
                return <li>{message}</li>
            }

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