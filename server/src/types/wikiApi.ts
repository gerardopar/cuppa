export interface WikiThumbnail {
  source: string;
  width: number;
  height: number;
}

export interface WikiPage {
  pageid: number;
  ns: number;
  title: string;
  thumbnail?: WikiThumbnail;
  pageimage?: string;
}

export interface WikiQuery {
  pages: {
    [pageId: string]: WikiPage;
  };
}

export interface WikiResponse {
  batchcomplete: string;
  query: WikiQuery;
}
