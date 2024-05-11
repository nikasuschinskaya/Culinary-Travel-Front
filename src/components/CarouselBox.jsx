import { Component } from "react";
import { Carousel } from "react-bootstrap";

import rainImg from "../assets/rain.jpg";
import romashkiImg from "../assets/romashki.jpg";

export default class CarouselBox extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={rainImg} alt="Rain" />
          <Carousel.Caption>
            <h3>Rain Image</h3>
            <p>Blalalalalalalalalalaalalalalalalalalalalalala</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={romashkiImg} alt="Romashki" />
          <Carousel.Caption>
            <h3>Romashki Image</h3>
            <p>Blalalalalalalalalalaalalalalalalalalalalalala</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
