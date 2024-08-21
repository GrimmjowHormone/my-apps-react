import { useState } from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
const users = [
  { userName: "john_doe", name: "John Doe", isFollowing: true },
  { userName: "jane_smith", name: "Jane Smith", isFollowing: false },
  { userName: "mark_jones", name: "Mark Jones", isFollowing: true },
];

export function App() {
  return (
    <section className="app">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;
        return (
          <TwitterFollowCard
            userName={userName}
            initialIsFollowing={isFollowing}
            key={userName}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
}
