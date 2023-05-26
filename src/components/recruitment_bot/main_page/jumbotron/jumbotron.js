import React, {Component} from 'react';
import './jumbotron.css';
import chat_icon from './static/dog_illustration.png';
import chat_icon_webp from './static/dog_illustration.webp';


class Jumbotron extends Component {
  
  constructor(props){
    super(props);

    // this.typwritertext=["","",""];
    this.TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
        this.wait = false;
        this.time = 50;
    };
    this.TxtType.prototype.tick = function() {
      if(this.wait === false){
        this.time = 50;
      }
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
    
        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

          this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    
        var that = this;
        // var delta = 200 - Math.random() * 100;
    
        // if (this.isDeleting) { delta /= 2; }
    
        if (!this.isDeleting && this.txt === fullTxt) {
        // delta = this.period;
          this.isDeleting = true;
          this.wait = true;
          
        } 
        else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          // delta = 500;
        }
        if(this.wait === true){
          this.time = 1000;
          this.wait = false;
        }
        setTimeout(function() {
        that.tick();
        }, this.time);
    };
  }
  show_products(){
    if(document.getElementById('products_main_holder')){
      let show = document.getElementById('products_main_holder')
      show.classList.add("products_main_holder_block");
      show.classList.remove("products_main_holder_hidden");
    }
  }



  componentDidMount(){
    var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new this.TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
  }


  render(){
    return(
      <div className="container">
        <div className="jumbotron_main_holder">
          <div className="row">
            <div className="col-md-6">
              <div className="jumbotron_info_holder">
                <div className="jumbotron_info_main">
                    <div className="typewrite-container">
                      <a className="typewrite" data-period="2000" data-type='[ "Are you buried in resumes?", "Need to identify the top candidates for the job?","Afraid of poor hiring decisions? We can prescreen for you!" ]'>
                        <span className="wrap"></span>
                      </a>

                    </div>

                </div>
              </div>
              <div className="recruitment_whitelisting_demo">
              <a href="https://mycareerdreams.com/recruitment_whitelisting/" className="anchor_link_styling">   View Demo </a>
                      </div>
            </div>
            <div className="col-md-6">
              <div className="jumbotron_icon_holder">
                <div className="jumbotron_icon_main">
                <picture>
                    <source srcset={chat_icon_webp} type="image/webp" />
                    <source srcset={chat_icon} type="image/png" />
                    <img srcset={chat_icon_webp} alt="" className="jumbotron_icon"/>
                </picture>
                  {/* <img className="jumbotron_icon" src={chat_icon} alt=""/> */}
                </div>
              </div>
            </div>
            {/* <div id="chat_bubble_post_767" className="chat_bubble_holder">
              <div className="chat_bubble_main">
                <a href="https://mycareerdreams.com/">
                  <img className="chat_bubble_icon" src={chat_bubble_767} alt=""/>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Jumbotron;
