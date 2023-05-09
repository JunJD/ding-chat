import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/Home.module.css";
const MainChat = () => {
  const theme = useTheme();
  const [openaikey, setOpenaikey] = useState("");
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const [messages, setMessages] = useState([
    {
      content: "我是ai智能，我能帮什么忙?",
      role: "assistant",
    },
  ]);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);
  const inputkeyRef = useRef(null);
  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (localStorage.getItem("openaikey")) {
      setOpenaikey(localStorage.getItem("openaikey"));
    }
  }, []);

  const handlesavekey = () => {
    setOpen(false);
    setOpenaikey(inputkeyRef.current.value);
    localStorage.setItem("openaikey", inputkeyRef.current.value);
  };

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: "哎呀!似乎有一个错误。请再试一次。", role: "assistant" },
    ]);
    setLoading(false);
    setUserInput("");
  };

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  useEffect(() => {
    if (!localStorage.getItem("openaikey")) {
      toggleDrawer(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }
    setLoading(true);
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: userInput, role: "user" },
    ]);
    // Send user question and history to API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + openaikey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 1,
        messages: [
          ...history,
          {
            role: "user",
            content: userInput,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      handleError();
      return;
    }

    // Reset user input
    setUserInput("");
    const data = await response.body;
    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let currentResponseMessage = "";
    setMessages((prevMessages) => {
      return [...prevMessages, { content: "...", role: "assistant" }];
    });
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunkValue = decoder.decode(value);
      currentResponseMessage += chunkValue;

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          content: currentResponseMessage + (done ? "" : "_"),
          role: "assistant",
        },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    // 聚焦文本区域
    !loading && textAreaRef.current.focus();
  }, [loading]);

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e) => {
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Keep history in sync with messages
  useEffect(() => {
    if (messages.length >= 6) {
      // 截取最后6条消息
      setHistory(messages.slice(messages.length - 6));
    } else {
      setHistory(messages);
    }
  }, [messages]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        alignItems: "center",
        py: { xs: 0.2, sm: 0.5 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
          borderRadius: "10px",
          border:
            theme.palette.mode === "dark"? "1px solid #30373d" : "1px solid #a1b7ca",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: matchDownMD
            ? "calc(100vh - 105px - 64px)"
            : "calc(100vh - 100px)",
        }}
      >
        <Box
          ref={messageListRef}
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            borderRadius: "10px",
            // 重写滚动条
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {messages.map((message, index) => {
            return (
              // 用户发送的最新消息将在等待响应时显示为动画
              <Box
                key={index}

                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  p: 2.5,
                  mt: 2,
                  color: "text.primary",
                  // 加载时显示背景动画效果
                  bgcolor: message.role === "assistant"
                    ? "background.paper" : "background.default",
                }}
              >
                {/* 根据消息类型显示正确的图标 */}
                {message.role === "assistant" ? (
                  <Image
                    src="/parroticon.png"
                    alt="AI"
                    width="30"
                    height="30"
                    className={styles.boticon}
                    priority={true}
                  />
                ) : (
                  <Image
                    src="/usericon.png"
                    alt="Me"
                    width="30"
                    height="30"
                    className={styles.usericon}
                    priority={true}
                  />
                )}
                <Box
                  sx={{
                    lineHeight: "1.75",
                    color: "text.primary",
                    '& a': {
                      fontWeight: 500,
                      '&:hover': {
                        opacity: 0.8,
                      },
                    },
                    '& code': {
                      color: 'warning.main',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',

                      '&:before': {
                        content: '"`"',
                      },
                      '&:after': {
                        content: '"`"',
                      },
                    },
                    '& ol': {
                      mr: 1,
                    },
                    '& ul': {
                      mr: 1,
                    },
                    '& li': {
                      m: 2,
                    },
                    '& p': {
                      mb: 1,
                    },
                  }}
                >
                  {/* 消息以Markdown格式呈现 */}
                  <ReactMarkdown linkTarget={"_blank"}>
                    {message.content}
                  </ReactMarkdown>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          mt: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                color: "text.primary",
                resize: "none",
                bgcolor: "background.paper",
                borderRadius: "10px",
                border: theme.palette.mode === "dark" ?
                  "1px solid #30373d"
                  : "1px solid #a1b7ca",
                outline: "none",
                p: 2,
                pr: 6,
                // 重写滚动条
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&:disabled": {
                  color: theme.palette.info.main,
                },
              }}
              component="textarea"
              disabled={loading}
              onKeyDown={handleEnter}
              ref={textAreaRef}
              autoFocus={false}
              rows={1}
              id="userInput"
              name="userInput"
              placeholder={loading ? "等待响应..." : "输入你的问题..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Box
              component="button"
              disabled={loading}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "0.87rem",
                right: "1.8rem",
                borderRadius: "50%",
                border: "none",
                p: 0.1,
                display: "flex",
                bgcolor: "background.paper",
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0.2rem",
                    right: "0.25rem",
                  }}
                >
                  <CircularProgress color="inherit" size={20} />{" "}
                </Box>
              ) : (
                <Box
                  component="svg"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                    sx={{
                      width: "1.2rem",
                      height: "1.2rem",
                      position: "absolute",
                      transform: "rotate(90deg)",
                      fill: "currentcolor",
                  }}
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default MainChat;
