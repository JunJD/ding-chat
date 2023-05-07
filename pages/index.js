import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Brightness2SharpIcon from '@mui/icons-material/Brightness2Sharp';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  CircularProgress,
  Drawer,
  TextField,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [openaikey, setOpenaikey] = useState("");
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      content: "我是ai智能，我能帮什么忙?",
      role: "assistant",
    },
  ]);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);
  const inputkeyRef = useRef(null)
  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (localStorage.getItem('openaikey')) {
      setOpenaikey(localStorage.getItem('openaikey'))
    }
  },[])
  
  const handlesavekey = () => {
    setOpen(false)
    setOpenaikey(inputkeyRef.current.value)
    localStorage.setItem('openaikey', inputkeyRef.current.value)
  }

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
    if (!localStorage.getItem('openaikey')) {
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
        'Content-Type': 'application/json',
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
        stream: true
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
    let currentResponseMessage = '';
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        { content: '...', role: "assistant" },
      ]
    });
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunkValue = decoder.decode(value);      
      currentResponseMessage += chunkValue;
      
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          content: currentResponseMessage + (done ? '' : '_'),
          role: "assistant"
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
    <>
      <Head>
        <title>ding Chat</title>
        <meta name="description" content="ding documentation chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topnav}>
        <div className={styles.navlogo}>
          <a href="/">ding</a>
        </div>
        <div className={styles.navlinks}>
          {darkMode ? (
            <LightModeOutlinedIcon
              onClick={() => setDarkMode(!darkMode)}
            />
          ) : (
              <Brightness2SharpIcon
                onClick={() => setDarkMode(!darkMode)}
              />
          )}
          <SettingsOutlinedIcon
            onClick={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                // 用户发送的最新消息将在等待响应时显示为动画
                <div
                  key={index}
                  className={
                    message.role === "user" &&
                    loading &&
                    index === messages.length - 1
                      ? styles.usermessagewaiting
                      : message.role === "assistant"
                      ? styles.apimessage
                      : styles.usermessage
                  }
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
                  <div className={styles.markdownanswer}>
                    {/* 消息以Markdown格式呈现 */}
                    <ReactMarkdown linkTarget={"_blank"}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                type="text"
                id="userInput"
                name="userInput"
                placeholder={loading ? "等待响应..." : "输入你的问题..."}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.loadingwheel}>
                    <CircularProgress color="inherit" size={20} />{" "}
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
          <div className={styles.footer}>
            <p>
              {" "}
              by{" "}
              <a href="https://github.com/JunJD/ding-chat" target="_blank">
                dingjunjie
              </a>
              .{" "}
            </p>
          </div>
        </div>

        <Drawer
          anchor={"bottom"}
          open={open}
          onClose={() => {
            toggleDrawer(false);
          }}
        >
          <Box
            sx={{
              minHeight: "80vh",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <TextField inputRef={inputkeyRef} fullWidth label="输入key" id="fullWidth" />
            <CardContent
              sx={{
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                欢迎访问dingAI,你需要输入你的openai_KEY
              </Typography>
              <Typography variant="body2">
                1.浏览器访问openAI官网
                <br />
                2.点击create new secret key
                <br />
                3.复制并粘贴到上方输入框
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handlesavekey} >确定</Button>
            </CardActions>
          </Box>
        </Drawer>
      </main>
    </>
  );
}
