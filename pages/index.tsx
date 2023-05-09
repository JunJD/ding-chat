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
        <meta name="description" content="ding documentation chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainLayout>
        <MainChat />
      </MainLayout>
    </>
  );
}
