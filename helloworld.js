var ComplimentMachine = React.createClass({
    getInitialState: function(){
      return {
          name:'melvin'
        }
    },

    handleChange: function(e){
        this.setState({
            name:e.target.value
        })
    },

    render: function(){
        return (
            <div>
                <h1>What's your name</h1>
                <input type="text" onChange={this.handleChange}/>
                {this.props.compliment},{this.state.name}
            </div>
        )
    }
})

ReactDOM.render(
    <ComplimentMachine compliment="Hey" />,
    document.getElementById("root")
);
