import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MainLayout from "../lib/layout";
import Header from "../lib/layout/Header";
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
import MainChat from "../lib/components/MainChat";

export default function Home() {

  return (
    <>
      <Head>
        <title>ding Chat</title>
        <meta name="description" content="基于OpenAI接口的聊天机器人，提供与人类类似的交互体验，让您的对话充满乐趣。" />
        <meta name="keywords" content="聊天机器人, AI聊天机器人, OpenAI聊天机器人" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainLayout>
        <MainChat />
      </MainLayout>
    </>
  );
}
