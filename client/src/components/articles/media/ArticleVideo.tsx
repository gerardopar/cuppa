import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";

import { Backdrop, Modal } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import PlayIcon from "../../svgs/PlayIcon";
import NewsLogo from "../../shared/NewsLogo";
import PublishedDate from "../../shared/PublishedDate";

import { YouTubePlaylistItem } from "@shared/types/ytApi";

interface ArticleVideoProps {
  video?: YouTubePlaylistItem;
  loading?: boolean;
  showDetails?: boolean;
}

export const ArticleVideo: React.FC<ArticleVideoProps> = ({
  video,
  loading = false,
  showDetails = false,
}) => {
  const videoUrl = `https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  if (loading || !video) {
    return (
      <div className="h-full group flex-1 flex flex-col h-64 relative mr-4 p-4 rounded-[12px] overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]" />

        <div className="absolute bottom-16 left-4 right-4 z-20">
          <Skeleton variant="text" width="70%" height={32} />
        </div>

        <div className="absolute bottom-4 left-4 flex items-center space-x-2 z-20">
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width={60} height={20} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full h-full relative rounded-[12px] overflow-hidden"
        onClick={() => {
          if (!showModal && !isPlaying) {
            setShowModal(true);
            setIsPlaying(true);
          }
        }}
      >
        <ReactPlayer
          url={videoUrl}
          controls={false}
          playing={false}
          light={true} // Shows thumbnail with play button
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "24px",
          }}
          config={{
            // @ts-expect-error PlayerVars not in ReactPlayer types
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                fs: 0,
              },
            },
          }}
          playIcon={
            <div
              className={`flex items-center justify-center w-[64px] h-[64px] rounded-full bg-black/70 hover:bg-[var(--secondary-light)] transition-colors z-20 cursor-pointer`}
            >
              <PlayIcon className="w-[32px] h-[32px] text-white" />
            </div>
          }
        />

        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 rounded-[12px]">
            <div className="h-full w-full flex items-center justify-center cursor-pointer">
              <div
                className={`flex items-center justify-center w-[64px] h-[64px] rounded-full bg-black/70 hover:bg-[var(--secondary-light)] transition-colors z-20`}
              >
                <PlayIcon className="w-[32px] h-[32px] text-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="w-full mt-2 flex items-center">
          <NewsLogo
            newsSource={video?.snippet?.channelId}
            className="!h-[40px] !w-[40px] !min-h-[40px] !min-w-[40px] !mr-2"
          />
          <div className="flex flex-col items-start justify-center">
            <h3 className="line-clamp-1 font-montserrat text-lg font-bold text-left text-gray-900 ">
              {video?.snippet?.title}
            </h3>
            <PublishedDate
              publishedAt={video?.snippet?.publishedAt ?? ""}
              className="text-xs"
            />
          </div>
        </div>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setIsPlaying(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
            <ReactPlayer
              url={videoUrl}
              playing={isPlaying}
              controls={true}
              width="100%"
              height="100%"
              config={{
                // @ts-expect-error PlayerVars not in ReactPlayer types
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    fs: 0,
                  },
                },
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ArticleVideo;
