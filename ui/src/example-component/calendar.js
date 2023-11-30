import React from "react";
import {Calendar} from "antd";

const ExampleCalendar = () => {
    /**
     * The following shows a HOC (Higher Order Component)
     * that wraps the Ant Design Calendar component.
     */
    const style = {
        width: '500px'
    }
    return (
        <div style={style}>
            <Calendar fullscreen={false} />
        </div>
    );
}

export default ExampleCalendar;