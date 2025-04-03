"use client";

import React, { use } from "react";
import { useStore } from "@/app/store/user";

export const Statususer = () => {
  const user = useStore((state: any) => state.user);
  const updateUser = useStore((state: any) => state.updateUser);
  const updateUserName = useStore((state: any) => state.updateUserName);
  const bears = useStore((state: any) => state.bears);
  return (
    <div>
      statususer
      <p>user : {user.username}</p>
      <input
        className="border-2 border-blue-400 w-full h-10"
        type="text"
        onChange={(e: any) => {
          username: e.target.value;
          console.log(e.target.value);
          updateUserName(e.target.value); // Update the username in the store
        }}
      />
      <p>bears : {bears}</p>
      <button
        type="button"
        className="bg-blue-400 w-full h-10"
        onClick={() => {
          useStore.setState((state: any) => ({ bears: state.bears + 1 })); // Increment the bears count
        }}
      >
        click!
      </button>
    </div>
  );
};
