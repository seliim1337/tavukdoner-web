import React, { Component } from "react";
import Line from "./components/Line";
import Field from "./components/Field";
import Activity from "./components/Activity";
import Spotify from "./components/Spotify";
import lanyard from "./functions/Lanyard";
import { Icon } from "@iconify/react";
import Tooltip from "./components/Tooltip";
import LinkCard from "./components/LinkCard";

//import Status from "./components/Status"
//import BadgesCard from "./components/card/BadgesCard"
//import Flags from "./components/Flags";

export default class Card extends Component {
  state = {
    lanyard: null,
    data: null,
  };

setStateOption = (key, value) => {
    this.setState((state) => {
      state[key] = value;
      return state;
    });
  };

getData = async (id) => {
    const userData = await fetch(`https://dcdn.dstn.to/profile/${id}`).then(
      async (res) => await res.json(),
    );

    return userData;
  };

async componentDidMount() {
    const id = this.props.id;
    await lanyard({
      userId: id,
      socket: true,
      onPresenceUpdate: async ({
        listening_to_spotify,
        spotify,
        activities,
      }) => {
        let userData = await this.getData(id);
        userData.spotify = listening_to_spotify ? spotify : null;
        userData.activities = activities;
        this.setStateOption("data", userData);
      },
    });
  }

render() {
    let { data } = this.state;
    console.log(data);
    const avatar =
      data && data.user
        ? formatAvatar(data.user.id, data.user.avatar)
        : "https://cdn.discordapp.com/embed/avatars/0.png";
    const banner =
      data && data.user ? formatBanner(data.user.id, data.user.banner) : null;
    const custom_status =
      data?.activities.find((a) => a.id === "custom") || null;
    return (
      <div className="min-w-fit outline-0">
        <div className={`${data ? "card-gradient mx-auto" : ""} my-5`}>
          <div className="card">
            <div className="">
              <div className="mb-10 block sm:mb-12 md:mb-16 lg:mb-16">
                <div id="banner">
                  {data && banner ? (
                    <img
                      src={banner}
                      alt="banner"
                      className="relative h-auto w-full"
                    />
                  ) : (
                    <svg width="100%" height="100%">
                      {/* [120px] */}
                      <mask id="mask">
                        <rect fill="#fff" width="100%" height="100%" />
                        <circle
                          className="sm:[cx:calc(80 / 2 +
                                                32)] [cx:calc(80 / 2 + 32)] [r:calc(80/2)] [cy:100%] sm:[r:calc(80/2)] md:[r:calc(112/2)] md:[cx:calc(112/2+36)] lg:[r:calc(128/2)]
                                                lg:[cx:calc(128/2+40)]"
                        />
                      </mask>
                      <foreignObject
                        x={0}
                        y={0}
                        width="100%"
                        height="100%"
                        overflow="visible"
                        mask="url(#mask)"
                      >
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundColor: data
                              ? data.user?.banner_color
                              : "#000",
                          }}
                        />
                      </foreignObject>
                    </svg>
                  )}

                  {/*Badges Card */}
                  {/*<BadgesCard />*/}

                </div>
                <div className="relative block">
                  <img
                    className="select-none"
                    id="avatar"
                    src={avatar}
                    alt="Discord avatar"
                    style={{
                      borderColor: "transparent",
                      backgroundColor: "transp292b2farent", //"#292b2f",
                    }}
                  />
                </div>
              </div>
              {/*Status */}
              {/* <Status /> 
              <div class="status box-color">
									<img
										id="status-image"
										src="./public/offline.svg"
										alt="" />
								</div>*/}
              <div
                className="relative w-full shadow-xl"
                // style={{ backgroundColor: "#292b2f" }}
              >
                {/* <Flags /> */}
                
                <div className="p-5">
                  <div
                    className="container mx-auto rounded-xl p-5"
                    style={{
                      backgroundColor: "#17181a",
                      width: "95%",
                    }}
                  >
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
                      {data && !data.user ? (
                        <span className="font-semibold text-white">
                          Not Found
                        </span>
                      ) : data?.user ? (
                        <>
                          <span className="font-semibold text-white select-none">
                            {data.user.username}
                          </span>

                          {/*<span className="font-semibold text-[#b9bbbe]">
                            {`#${data.user.discriminator}`}
                          </span>
                          */}

                          {/*User Name Copy */}
                          <div className="inline-block">
                            <Tooltip
                              content="Copied!"
                              type="success"
                              triggers="click"
                              delay={[0, 2000]}
                            >
                              
                              <Tooltip
                                content="Click to copy the username!"
                                placement="top"
                                delay={[500, 0]}
                              >
                                <button
                                  onClick={(e) => {
                                    navigator.clipboard.writeText(
                                      `${data.user.username}`,
                                    );
                                  }}
                                >
                                  <Icon
                                    icon="ic:outline-file-copy"
                                    className="ml-1 text-[#b9bbbe]"
                                  />
                                </button>
                              </Tooltip>
                            </Tooltip>
                          </div>
                        </>
                      ) : (
                        <p className="font-semibold text-white select-none">
                          Loading...
                        </p>
                      )}
                    </div>
                    {data && (
                      <>
                        {custom_status && (
                          <div className="mt-2 text-[#b9bbbe] select-none">
                            <p>
                              {custom_status.emoji && (
                                <>{custom_status.emoji.name} </>
                              )}
                              {custom_status.state}
                            </p>
                          </div>
                        )}
                        {data.user && (
                          <>
                            <Line />

                            {/*About Me */}
                            {data.user.bio && (
                              <Field
                                className="select-none"
                                title="About Me"
                                value={data ? data.user.bio : "Loading..."}
                              />
                              
                            )}
                          </>
                        )} 

                        {/*Discord Member Since 
                          <div className="flex mt-5">
                          <span className="mb-3 border-solid text-xs font-bold text-white sm:text-xs md:text-sm lg:text-base select-none">
                            Discord Member Since
                            </span>
                            </div>
                            <div className="relative flex">
                          <div className=" block text-xs sm:text-sm md:text-base md:leading-5">
                            <p className="text-[#b9bbbe] select-none">16 Feb 2019</p>
                          </div>
                        </div>*/}
                              
                        {data.activities
                          ?.filter(
                            (a) =>
                              !["spotify", "custom"].some((n) =>
                                a.id.includes(n),
                              ),
                          )
                          .map((activity) => (
                            <Activity activity={activity} />
                          ))}
                        {data?.spotify && <Spotify data={data.spotify} />}
                        <Line />

                        {/*Link Card */}
                        <div className="-mx-2 flex flex-wrap">
                          <LinkCard
                            className="mx-2 mt-5 select-none"
                            icon="mdi:github"
                            name="selimstone"
                            link="https://github.com/seliim1337"
                          />
                        </div>
                        {/* {data?.connected_accounts &&
									data.connected_accounts.map((acc) => (
										<LinkCard icon={acc.type} name={acc.name} />
									))} */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function formatAvatar(userId, id) {
  if (!userId || !id) return null;
  return `https://cdn.discordapp.com/avatars/${userId}/${id}.png?size=512`;
}

function formatBanner(userId, id) {
  if (!userId || !id) return null;
  return `https://cdn.discordapp.com/banners/${userId}/${id}.png?size=2048`;
}
