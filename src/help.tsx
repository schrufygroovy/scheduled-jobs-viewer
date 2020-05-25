import * as React from "react";
import zoomIn from './zoom_in.png';
import zoomOut from './zoom_out.png';
import draganddrop from './draganddrop.gif';

interface HelpProps {
}

export const Help: React.FunctionComponent<HelpProps> = (props) => {
  return (
    <article>
      <details>
        <summary style={{fontSize: 20}}>Quick Tips for usage</summary>
        <details>
            <summary>Zooming into a specific time frame</summary>
            <img src={zoomIn} alt="Zoom in by clicking any hour" />
        </details>
        <details>
            <summary>Moving the time frame</summary>
            <p>Drag and drop to scroll horizontally</p>
            <img src={draganddrop} style={{maxHeight: 250}} alt="Drag and drop to scroll horizontally" />
        </details>
        <details>
            <summary>Zooming out back to day view</summary>
            <img src={zoomOut} alt="Zoom out by clicking any day" />
        </details>
        <details>
            <summary>Modifying Jobs</summary>
            <p>You can modify the text area on the right side. The timeline will adapt live.</p>
        </details>
      </details>
    </article>
  )
}