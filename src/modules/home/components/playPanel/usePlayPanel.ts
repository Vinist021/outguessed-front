import { useState } from "react";
import type { ChangeEvent } from "react";
import useAuth from "@/shared/contexts/auth/useAuth";

export default function usePlayPanel() {
  const { state } = useAuth();
  const [guestNickname, setGuestNickname] = useState("");

  function handleNicknameChange(event: ChangeEvent<HTMLInputElement>) {
    if (state.user) return;

    setGuestNickname(event.target.value);
  }

  return {
    state: {
      nickname: state.user?.name ?? guestNickname,
      isNicknameReadOnly: state.user !== null,
    },
    methods: { handleNicknameChange },
  };
}
