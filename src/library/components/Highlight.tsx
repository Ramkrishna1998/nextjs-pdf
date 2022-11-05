import { Component } from "react";
import type { LTWHP } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
  };
  isScrolledTo: boolean;
  id?: string;
  currentId?: string;
}

export class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      // isScrolledTo,
      id,
      currentId
    } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${id === currentId ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={rect}
              className={`Highlight__part`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
