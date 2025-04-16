import {
  FeedOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

export const routes: { id: number; path: string; Icon: React.ElementType }[] = [
  { id: 1, path: "/home", Icon: FeedOutlined },
  { id: 2, path: "/saved", Icon: FavoriteBorderOutlined },
  { id: 3, path: "/search", Icon: SearchOutlined },
  { id: 4, path: "/profile", Icon: AccountCircleOutlined },
  { id: 5, path: "/settings", Icon: SettingsOutlined },
];
