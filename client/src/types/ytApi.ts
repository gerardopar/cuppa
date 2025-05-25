export interface YouTubePlaylistItem {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium?: Thumbnail;
      high?: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: "youtube#video";
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubePlaylistItemsResponse {
  kind: "youtube#playlistItemListResponse";
  etag: string;
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
