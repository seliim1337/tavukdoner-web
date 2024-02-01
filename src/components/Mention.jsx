import React, { Component } from "react";

export default class Mention extends Component {
    render() {
        if (this.props.id)
            return (
                <a
                    href={`https://discord.com/users/${this.props.id}`}
                    className="underline-offset-2 text-[#fff] text-opacity-80 hover:text-opacity-100"
                >
                    <code className="bg-[#5865F240] hover:bg-[#5865F2] font-sans font-medium">
                        @{this.props.username}
                    </code>
                </a>
            );
        else
            return (
                <code className="bg-[#5865F240] hover:bg-[#5865F2] font-sans font-medium">
                    @{this.props.username}
                </code>
            );
    }
}
