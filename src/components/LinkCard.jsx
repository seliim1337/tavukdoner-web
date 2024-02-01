import React, { Component } from "react";
import { Icon } from "@iconify/react";

export default class LinkCard extends Component {
    render() {
        return (
            <div
                className={`container rounded p-4 w-fit flex space-x-3 ${this.props.className}`}
                style={{ backgroundColor: "#202225" }}
            >
                <Icon
                    icon={this.props.icon || "akar-icons:link-chain"}
                    color="#fff"
                    width="25"
                    height="25"
                    // className="mr-2"
                />
                <span className="text-white mt-1">{this.props.name}</span>
                {this.props.link && (
                    <a href={this.props.link} target="blank">
                        <Icon
                            icon="ci:external-link"
                             color="#fff"
                             width="25"
                             height="25"
                            className="text-white hover:text-gray-300 lg:w-6 md:w-6 sm:w-5 w-4 h-auto"
                        />
                    </a>
                )}
            </div>
        );
    }
}
