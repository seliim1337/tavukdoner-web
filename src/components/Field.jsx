import React, { Component } from "react";
import parse from "html-react-parser";

export default class Field extends Component {
    getValue() {
        let value = this.props.value;
        if (!value) return null;
        value = matchReplace(
            this.props.value,
            /\*\*.+\*\*/i,
            "**",
            "b",
            /`.+`/,
            "`",
            "code",
            /\n|\\n/,
            "\n",
            "br"
        );
        const urls =
            value.match(/(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gim) || [];
        for (const url of urls) {
            value = replace(
                value,
                url,
                `<a href="${url}" target="_blank">${url}</a>`
            );
        }

        return value;
    }

    render() {
        return (
            <>
                <p className="font-bold text-white mt-5 mb-3 border-solid lg:text-base md:text-sm sm:text-xs text-xs">
                    {this.props.title?.toUpperCase() || "TITLE"}
                </p>
                {this.getValue() && (
                    <p
                        className="lg:text-base md:text-sm sm:text-xs text-xs"
                        style={{ color: "#b9bbbe" }}
                    >
                        {parse(this.getValue())}
                    </p>
                )}
            </>
        );
    }
}

function matchReplace() {
    /** @type {any[]} */
    let args = Array.from(arguments).reduce((arr, v, i) => {
        if (i === 0) arr.push(v, []);
        else {
            if (i !== 1 && (i - 1) % 3 === 0) arr.push([]);
            arr[arr.length - 1].push(v);
        }
        return arr;
    }, []);
    /** @type {string} */
    let text = args.shift();
    for (const [regex, key, tag] of args) {
        if (!regex || !key || !tag) continue;
        let value = text.match(regex)?.[0];
        if (value) {
            let newValue = replace(value, key, [`<${tag}>`, `</${tag}>`]);
            for (const s of newValue.match(/> /) || [])
                newValue = replace(newValue, s, ">&nbsp;");
            for (const s of newValue.match(/ <\//) || [])
                newValue = replace(newValue, s, "&nbsp;</");
            text = replace(text, value, newValue);
        }
    }
    return text;
}

function replace() {
    let args = Array.from(arguments).reduce((arr, v, i) => {
        if (i === 0) arr.push(v, []);
        else {
            if (i !== 1 && (i - 1) % 2 === 0) arr.push([]);
            arr[arr.length - 1].push(v);
        }
        return arr;
    }, []);
    let text = args.shift();
    for (const [key, value] of args) {
        if (!key || !value) continue;
        if (Array.isArray(value)) {
            for (const v of value)
                text = String.prototype.replace.call(text, key, v);
        } else text = String.prototype.replaceAll.call(text, key, value);
    }
    return text;
}
