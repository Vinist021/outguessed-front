import { useState } from "react";
import type { ChangeEvent } from "react";
import useAuth from "@/shared/contexts/auth/useAuth";
import type { RoomName } from "@/modules/home/mocks/rooms";

export default function usePlayPanel() {
  const { state } = useAuth();
  const [guestNickname, setGuestNickname] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState<RoomName | null>(null);

  function handleSelectRoom(roomName: RoomName) {
    setSelectedRoomName(roomName);
  }

  function handleNicknameChange(event: ChangeEvent<HTMLInputElement>) {
    if (state.user) return;

    setGuestNickname(event.target.value);
  }

  return {
    state: {
      nickname: state.user?.name ?? guestNickname,
      isNicknameReadOnly: state.user !== null,
      selectedRoomName,
    },
    methods: { handleNicknameChange, handleSelectRoom },
  };
}
