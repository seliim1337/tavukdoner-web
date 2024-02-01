import React, { Component } from "react";
import { Icon } from "@iconify/react";
import Tooltip from "./Tooltip";
import questionMark from "./question-mark.svg";
import _ from "lodash";

export default class Activity extends Component {
    render() {
        if (Object.keys(this.props).length === 0) return <></>;
        const {
            iconSettings,
            title,
            largeImage,
            largeImageText,
            smallImage,
            smallImageText,
            name,
            details,
            state,
            time,
        } = this.props;
        return (
            <>
                <div className="flex mt-5">
                    {title && (
                        <p className="select-none font-bold text-white mb-3 border-solid lg:text-base md:text-sm sm:text-xs text-xs">
                            {title}
                        </p>
                    )}
                    {iconSettings && (
                        <div className="absolute" style={{ right: "9%" }}>
                            <Icon
                                icon={`mdi:${iconSettings.name}`}
                                {..._.pickBy(
                                    iconSettings,
                                    (value, key) => key !== "name"
                                )}
                            />
                        </div>
                    )}
                </div>
                <div className="relative flex self-start">
                    {largeImage ? (
                        largeImageText ? (
                            <Tooltip content={largeImageText} className="select-none" placement="top">
                                <img
                                    src={largeImage}
                                    alt={largeImageText}
                                    className="rounded-lg lg:w-20 md:w-20 sm:w-16 w-14 h-auto mr-3 select-none"
                                />
                            </Tooltip>
                        ) : (
                            <img
                                src={largeImage}
                                alt=""
                                className="rounded-lg lg:w-20 md:w-20 sm:w-16 w-14 h-auto mr-3 select-none"
                            />
                        )
                    ) : (
                        <img
                            src={questionMark}
                            alt="blank"
                            className="lg:w-10 md:w-10 sm:w-8 w-7 h-auto mr-3 select-none"
                        />
                    )}
                    {smallImage && (
                        <div className="absolute lg:left-14 lg:top-14 md:left-14 md:top-14 sm:left-11 sm:top-11 left-10 top-10">
                            {smallImageText ? (
                                    <img
                                        src={smallImage}
                                        alt={smallImageText}
                                        className="rounded-[50%] lg:w-7 md:w-7 sm:w-6 w-5 h-auto border-2 select-none"
                                        style={{
                                            borderColor: "#17181a",
                                            backgroundColor: "#17181a",
                                        }}
                                    />
                            ) : (
                                <img
                                    src={smallImage}
                                    alt={smallImageText}
                                    className="rounded-full lg:w-7 md:w-7 sm:w-6 w-5 h-auto border-2 select-none"
                                    style={{
                                        borderColor: "#17181a",
                                        backgroundColor: "#17181a",
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div className="block md:text-base md:leading-5 sm:text-sm text-xs">
                        {name && <p className="text-white select-none">{name}</p>}
                        {details && (
                            <p className="select-none" style={{ color: "#b9bbbe" }}>{details}</p>
                        )}
                        {state && <p className="select-none" style={{ color: "#b9bbbe" }}>{state}</p>}
                        {time && <p className="select-none" style={{ color: "#b9bbbe" }}>{time}</p>}
                    </div>
                </div>
            </>
        );
    }
}
