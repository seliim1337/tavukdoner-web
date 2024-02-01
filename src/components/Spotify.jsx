import moment from "moment";
import { useEffect, useState } from "react";
// import { Client } from "spotify-api.js";
import Tooltip, { Arrow } from "./Tooltip";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";
// import _ from "lodash";

// const CustomTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         color: "#fff",
//         border: "",
//         // maxWidth: 220,
//         // fontSize: theme.typography.pxToRem(12),
//         // border: "1px solid #dadde9",
//     },
// }));

export default function Spotify({ data }) {
  const {
    song,
    artist,
    album,
    album_art_url,
    timestamps: { start, end },
    track_id,
  } = data;
  const artists = artist
    .split("; ")
    // .map((art) => client.artists.search(art).then((a) => a?.[0] || art))
    // .map((/** @type {Artist} */ artist) => (
    //     <a href={artist.externalURL?.spotify || "#"}>
    //         {artist.name || artist}
    //     </a>
    // ))
    .join(", ");
  const [duration, setDuration] = useState(formatTime(start, end));
  // (async () => {
  //     track = await client.tracks.get(track_id);
  //     console.log(track);
  // })();
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(formatTime(start, end));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="flex mt-5">
        <span className="mb-3 border-solid text-xs font-bold text-white sm:text-xs md:text-sm lg:text-base select-none">
        Listening to Spotify&nbsp;
        </span>
        {/*Spotify Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM16.5625 16.4375C16.3791 16.7161 16.0145 16.8107 15.7188 16.6562C13.375 15.2188 10.4062 14.9062 6.9375 15.6875C6.71979 15.7377 6.49182 15.668 6.33945 15.5046C6.18709 15.3412 6.13348 15.1089 6.19883 14.8952C6.26417 14.6816 6.43854 14.519 6.65625 14.4688C10.4688 13.5938 13.7188 13.9688 16.375 15.5938C16.5149 15.6781 16.6141 15.816 16.6495 15.9755C16.685 16.1349 16.6535 16.3019 16.5625 16.4375ZM17.8125 13.6875C17.7053 13.8622 17.5328 13.9869 17.3333 14.0338C17.1338 14.0807 16.9238 14.0461 16.75 13.9375C14.0625 12.2812 9.96875 11.8125 6.78125 12.7812C6.5133 12.8594 6.22401 12.7887 6.02236 12.5957C5.8207 12.4027 5.73731 12.1168 5.80361 11.8457C5.8699 11.5746 6.0758 11.3594 6.34375 11.2812C9.96875 10.1875 14.5 10.7188 17.5625 12.625C17.9134 12.8575 18.0229 13.3229 17.8125 13.6875ZM17.9062 10.875C14.6875 8.96875 9.375 8.78125 6.28125 9.71875C5.81691 9.79284 5.36952 9.5115 5.23513 9.0609C5.10074 8.61031 5.32093 8.12986 5.75 7.9375C9.28125 6.875 15.1562 7.0625 18.875 9.28125C19.0893 9.40709 19.2434 9.61436 19.3023 9.85577C19.3612 10.0972 19.3198 10.3521 19.1875 10.5625C18.9054 10.9822 18.3499 11.1177 17.9062 10.875Z"
        fill="#1ED760"
      />
      </svg>
        {/* <div className="absolute" style={{ right: "9%" }}>
                        <Icon
                            icon={`mdi:${iconSettings.name}`}
                            {..._.pickBy(
                                iconSettings,
                                (value, key) => key !== "name"
                            )}
                        />
                    </div> */}
      </div>
      
      <div className="relative flex">
        <Tooltip content={album} className="select-none" placement="top" arrow={Arrow()}>
          <a
          href={`https://open.spotify.com/track/${track_id}`} 
          target="_blank"
          rel="noopener noreferrer"
          >
          <img
            src={album_art_url}
            alt={album}
            className="h-auto w-14 rounded-xl sm:w-16 md:w-20 lg:w-20 select-none"
          />
          </a>
        </Tooltip>
        <div className="ml-3 block text-xs sm:text-sm md:text-base md:leading-5">
          <a 
          href={`https://open.spotify.com/track/${track_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className=" block whitespace-nowrap text-ellipsis overflow-hidden text-sm font-semibold hover:underline underline-offset-2 text-slate-300 select-none"
          >
          <p className="text-white select-none">{song}</p>
          </a>
          <p className="text-[#b9bbbe] select-none">by {`${artists}`}</p>
          <p className="text-[#b9bbbe] select-none">on {album}</p>
          <p className="text-[#b9bbbe] select-none">{`${duration} elapsed`}</p>
        </div>
      </div>
      {/* <Activity
                // iconSettings={{
                // 	name: "spotify",
                // 	color: "#1ed760",
                // 	// className: "float-right mr-12",
                // 	width: "30",
                // 	height: "30",
                // }}
                title="SPOTİFY DİNLİYOR"
                largeImage={album_art_url}
                largeImageText={album}
                // smallImage="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
                // smallImageText="Spotify"
                name={song}
                details={`${artist.replaceAll(";", ",")} tarafından`}
                state={album}
                time={`${duration} geçti`}
            /> */}
    </>
  );
}

function formatTime(start, end) {
  return moment.duration(Date.now() - start).format("mm [minute] ss [second]");
}
