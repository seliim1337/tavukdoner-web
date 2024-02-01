import React, { Component } from "react";
import Template from "./ActivityTemplate";
import moment from "moment";
// import Tooltip from "./Tooltip";
import "moment-duration-format";

export default class Activity extends Component {
    constructor(props) {
        super(props);

        const start = props.activity.timestamps?.start;
        if (start) {
            this.state = {
                activityTimer: calcLeft(start),
            };
            setInterval(() => {
                this.setState({
                    activityTimer: calcLeft(start),
                });
            }, 1000);
        }
    }

    render() {
        const { activity } = this.props;
        const { name, details, state, application_id, assets } = activity;
        const { large_image, large_text, small_image, small_text } =
            assets || {};

        return (
            <Template
                title={title(activity)}
                largeImage={
                    large_image
                        ? formatImage(application_id, large_image)
                        : undefined
                }
                largeImageText={large_text}
                smallImage={
                    small_image
                        ? formatImage(application_id, small_image)
                        : undefined
                }
                smallImageText={small_text}
                name={name}
                state={state}
                details={details}
                time={
                    this.state?.activityTimer
                        ? `${this.state.activityTimer} elapsed`
                        : undefined
                }
            />
        );
        // return (
        // 	<>
        // 		{activity && (
        // 			<>
        // 				<p className="font-bold text-white mt-5 mb-3 border-solid lg:text-base md:text-sm sm:text-xs text-xs">
        // 					{title(activity)}
        // 				</p>
        // 				<div className="relative flex">
        // 					{/* <div
        // 						ref={(e) =>
        // 							e &&
        // 							e.style.setProperty(
        // 								"background-color",
        // 								"#17181a",
        // 								"important"
        // 							)
        // 						}
        // 						// style={{ borderColor: "#17181a" }}
        // 					> */}
        // 					<Tooltip
        // 						content={assets.large_text}
        // 						trigger="hover"
        // 						animation="duration-150"
        // 						// eslint-disable-next-line
        // 						style="dark"
        // 					>
        // 						<img
        // 							src={formatImage(application_id, assets.large_image)}
        // 							alt={assets.large_text}
        // 							className="rounded-xl lg:w-20 md:w-20 sm:w-16 w-14 h-auto mr-3"
        // 						/>
        // 					</Tooltip>
        // 					{/* </div> */}
        // 					<div className="absolute lg:left-14 lg:top-14 md:left-14 md:top-14 sm:left-11 sm:top-11 left-10 top-10">
        // 						<Tooltip
        // 							content={assets.small_text}
        // 							trigger="hover"
        // 							animation="duration-150"
        // 							// eslint-disable-next-line
        // 							style="dark"
        // 						>
        // 							<img
        // 								src={formatImage(
        // 									application_id,
        // 									assets.small_image
        // 								)}
        // 								alt={assets.small_text}
        // 								className="rounded-full lg:w-7 md:w-7 sm:w-6 w-5 h-auto border-2"
        // 								style={{ borderColor: "#17181a" }}
        // 							/>
        // 						</Tooltip>
        // 					</div>
        // 					<div className="block md:text-base md:leading-5 sm:text-sm text-xs">
        // 						<p className="text-white">{name}</p>
        // 						<p style={{ color: "#b9bbbe" }}>{details}</p>
        // 						<p style={{ color: "#b9bbbe" }}>{state}</p>
        // 						<p style={{ color: "#b9bbbe" }}>
        // 							{this.state.activityTimer} elapsed
        // 						</p>
        // 					</div>
        // 				</div>
        // 			</>
        // 		)}
        // 	</>
        // );
    }
}

function calcLeft(timestamp) {
    const date = new Date(Date.now() - timestamp);
    return moment
        .duration(date.getTime())
        .format(date.getMinutes() > 0 ? "h:mm:ss" : "m:ss", {
            trim: date.getMinutes() > 0,
        });
}

function title(activity) {
    switch (activity.type) {
        case 0:
            return "Playing a game";
        case 1:
            return "On The Air";
        case 2:
            return "Listening to Spotify";
        case 3:
            return `${activity.name.toUpperCase()} Watching`;
        case 4:
            return "Custom Status";
        case 5:
            return `${activity.name.toUpperCase()} Competes In The Competition`;
        default:
            break;
    }
}

function formatImage(appId, id) {
    return `https://cdn.discordapp.com/app-assets/${appId}/${id}.png?size=512`;
}
