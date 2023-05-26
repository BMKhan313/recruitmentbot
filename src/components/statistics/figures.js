import React, {Component} from 'react';
import './figures.css';

class Figures extends Component {
  render(){
    return(
      <div id="set_container_width">
      <div className="container">
        <div className="figures_main_container">
          {/* <div className="row">
            <div id="figures_heading" className="about_heading">Statistics From Pakistan</div>
          </div> */}
          <div className="figures_numbers_container">
              <div className="figures_number">
                76%
                <div className="figures_border"></div>
                <div className="figures_info_599_holder">
                  <div className="figures_info_599">Students drop out of higher education institutions due to lack of counselling</div>
                </div>
              </div>
              <div className="figures_number">
                82.6%
                <div className="figures_border"></div>
                <div className="figures_info_599_holder">
                  <div className="figures_info_599">Students believe there is a need for a career counsellor</div>
                </div>
              </div>
              <div className="figures_number">
                94.74%
                <div className="figures_border"></div>
                <div className="figures_info_599_holder">
                  <div className="figures_info_599">Recruiters believe students pick the wrong subjects due to no quality career advice</div>
                </div>
              </div>
          </div>
          <div className="figures_info_container">
            <div className="figures_info">Students drop out of higher education institutions with lack of career counnselling being a leading cause</div>
            <div className="figures_info">Students believe there is a need for a career counsellor</div>
            <div className="figures_info">Recruiters believe students pick the wrong subjects due to no quality career advice</div>
          </div>
        </div>

      </div>
      </div>
    )
  }
}

export default Figures;
