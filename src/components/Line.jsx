import React, { Component } from "react";

export default class Line extends Component {
	render() {
		return (
			<div
				className="rounded mt-5"
				style={{
					backgroundColor: "#49494b",
					width: this.props.width || "100%",
					height: this.props.height || "2px",
				}}
			/>
		);
	}
}
