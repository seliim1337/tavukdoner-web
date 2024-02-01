import React, { Component } from "react";
import Tooltip, { Arrow } from "../Tooltip";

export default class BadgesCard extends Component {
	render() {
		return (
			<div className="absolute top-[165px] left-[20px] justify-end select-none">
        <Tooltip content="Hypesquad Balance" placement="top" arrow={Arrow()}>
          <img
            src="/assets/discord-hypesquad-balance.svg"
            alt="discord-hypesquad-balance"
            width="28"
            height="28"
            className="inline-block"
            draggable="false"
          />
          </Tooltip>
          {/*<Tooltip content="Active Developer" placement="top" arrow={Arrow()}>
          <img
            src="/assets/discord-active-developer.svg"
            alt="discord-active-developer"
            width="22"
            height="22"
            className="inline-block"
            draggable="false"
          />   
          </Tooltip>     
          <img          
            data-tooltip-id="badges-tooltip" 
            data-tooltip-content="Subscriber since 19 Oct 2019"
            src="/assets/discord-nitro.svg"
            alt="discord-nitro"
            width="22"
            height="22"
            className="inline-block"
            draggable="false"
          />
          <img
            data-tooltip-id="badges-tooltip" 
            data-tooltip-content="Server Boosting since 19 Oct 2019"
            src="/assets/discord-booster.svg"
            alt="discord-booster"
            width="22"
            height="22"
            className="inline-block"
            draggable="false"
          />
          <img
            data-tooltip-id="badges-tooltip" 
            data-tooltip-content="Originally known as selim#0697"
            src="/assets/originally-name.png"
            alt="discord-booster"
            width="22"
            height="22"
            className="inline-block"
            draggable="false"
          />*/}
         
          </div>
        
		);
	}
}
