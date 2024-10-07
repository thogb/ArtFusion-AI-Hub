"use client";

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import DashBoardAppBar from "@/components/DashBoardLayout/DashBoardAppBar/DashBoardAppBar";

import DashBoardMainContent from "@/views/DashBoardMainContent/DashBoardMainContentView";


const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display={"flex"} minHeight={"100vh"}>
      <CssBaseline />
      <DashBoardAppBar />
      <Box component={"main"} flexGrow={1} width={"100%"} pt={8}>
        {children}
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
