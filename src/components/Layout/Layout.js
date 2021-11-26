import React from "react";
import { Head,Menu,NewSideBar } from 'components/Layout'
import "App.css";
import { SideBar } from 'components'
import { Content } from 'components'
import Clima from "components/Elements/Weather/Weather";
import { BrowserRouter as Router } from "react-router-dom";

export class Layout extends React.Component {
    constructor(props) {
      super(props);
  
      // Moblie first
      this.state = {
        isOpen: false,
        isMobile: true,
        
        lugares:[
          {coords: "0,1", name: "castellon", alias: "cs"},
          {coords: "0,2", name: "valencia", alias: "vlc"}
        ],
        
        clima: {icon: "URL", description: "string", temp: "number", rain: "number", wind: "number"},
        
        eventos: [
          {title: 'string', date: 'string', location: 'string', author: 'string', url: 'URL', image: 'URL', price: 'number'},
          {title: 'string', date: 'string', location: 'string', author: 'string', url: 'URL', image: 'URL', price: 'number'}
        ],

        noticias:[
          {title: 'string', description: 'string', author: 'string', url: 'URL', image: 'URL'},
          {title: 'string', description: 'string', author: 'string', url: 'URL', image: 'URL'}
        ]   
      };
  
      this.previousWidth = -1;
    }
  
    updateWidth() {
      const width = window.innerWidth;
      const widthLimit = 576;
      const isMobile = width <= widthLimit;
      const wasMobile = this.previousWidth <= widthLimit;
  
      if (isMobile !== wasMobile) {
        this.setState({
          isOpen: !isMobile
        });
      }
  
      this.previousWidth = width;
    }
  
    /**
     * Add event listener
     */
    componentDidMount() {
      this.updateWidth();
      window.addEventListener("resize", this.updateWidth.bind(this));
    }
  
    /**
     * Remove event listener
     */
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWidth.bind(this));
    }
  
    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };
  
    render() {
        return(
            <div className="App wrapper">
                <Router>
                  <SideBar lugares={this.state.lugares} toggle={this.toggle} isOpen={this.state.isOpen} />
                </Router>
                <Content toggle={this.toggle} isOpen={this.state.isOpen} />
            </div>
        )
    }
}