import { Ionicons } from "@expo/vector-icons";
import { currentTheme } from "../constants/atoms";
import { useAtom } from "jotai";
import { Box, Text, useTheme } from "native-base";
import React from "react";
import ProfileImage from "./ProfileImage";

interface CommentProps {
  host_id: string;
  description: string;
}

const Comment = ({ host_id, description }: CommentProps) => {
  const { colors } = useTheme();
  const [currTheme] = useAtom(currentTheme);
  return (
    <Box flexDir='row' p={3} justifyContent="space-between">
      <Box flexDir='row'>
        <ProfileImage id={host_id} />
        <Text ml={3} my='auto'>{description}</Text>
      </Box>
      <Box flexDir="row" my='auto'>
        <Ionicons
          name="heart-outline"
          size={20}
          color={colors[currTheme].text}
        />
        <Text ml={1}>{2}</Text>
      </Box>
    </Box>
  )
}

export default Comment
