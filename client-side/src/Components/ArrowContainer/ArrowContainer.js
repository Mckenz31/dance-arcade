class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rate: 0
      }
    }
    animate(element) {
      let { rate } = this.state
      setTimeout(function(){ 
        element.style.transform = `translateY(${rate})`
        
      }, 3000);
    }
    componentDidMount() {
      
    }
    render() {
      return <div><LeftArrow width="50" /></div>;
    }
  }