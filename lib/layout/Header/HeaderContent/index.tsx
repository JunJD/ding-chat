// material-ui
import {
  Box,
  IconButton,
  Link,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { /*GithubOutlined,*/ BulbOutlined } from "@ant-design/icons";

// project import
import Search from "./Search";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";
import { useRecoilState, useRecoilValue } from "recoil";
import { Brightness2Sharp, LightModeOutlined } from "@mui/icons-material";
import { Backup } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useMemo } from "react";
import { mainStore } from "../../../store/main";
import { openaiStore } from "../../../store/openai";

const HeaderContent = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  // 控制开灯关灯的按钮
  const [mainState, setMainState] = useRecoilState(mainStore);
  const light = useMemo(() => mainState.light, [mainState.light]);
  const openai = useRecoilValue(openaiStore);
  const handleFile = () => {
    if (localStorage.getItem("embeddingStore")) {
      const embeddingStore = JSON.parse(localStorage.getItem("embeddingStore")!);
      console.log(embeddingStore);
      return
    }

    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const form = new FormData();
        form.append("file", file);
        fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "openaiKey": openai.apikey,
          },
          body: form,
        })
          .then((res) => res.json())
          .then((embeddingStore) => {
            localStorage.setItem("embeddingStore", JSON.stringify(embeddingStore));
          });
      }
    };
    input.click();
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          ml: { xs: 0, md: 1 },
        }}
      >
        <Tooltip title="点击刷新,内容清空">
          <Link
            href="/"
            underline="none"
            variant="h4"
            color="primary"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            叮AI
          </Link></Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip title="上传文件进行ai训练">
          <IconButton>
            <Backup color="primary" onClick={handleFile} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          ml: 0.75,
          display: "flex",
          alignItems: "center",
        }}
      >
        {light ? (
          <LightModeOutlined
            sx={{
              ml: 0.75,
            }}
            color="primary"
            onClick={() => setMainState((pre) => ({ ...pre, light: !light }))}
          />
        ) : (
          <Brightness2Sharp
            sx={{
              ml: 0.75,
            }}
            color="primary"
            onClick={() => setMainState((pre) => ({ ...pre, light: !light }))}
          />
        )}
      </Box>

      {/* <Notification /> */}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
