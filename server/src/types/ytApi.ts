export interface YouTubeSearchResponse {
  kind: string;
  items: YouTubeSearchItem[];
}

export interface YouTubeSearchItem {
  kind: "youtube#searchResult";
  id: {
    kind: "youtube#video";
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}
