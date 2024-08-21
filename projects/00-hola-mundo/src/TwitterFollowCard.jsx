import { useState } from "react";

export function TwitterFollowCard({
  children,
  userName = "unknow",
  initialIsFollowing
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const imageSrc = `https://unavatar.io/${userName}`;
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "follow-card-button is-following"
    : "follow-card-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="follow-card">
      <header className="follow-card-header">
        <img
          className="follow-card-avatar"
          src={imageSrc}
          alt="Imagen de perfil"
        />
        <div className="follow-card-info">
          <strong>{children}</strong>
          <span className="follow-card-infoUserName">@{userName}</span>
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="follow-card-text">{text}</span>
          <span className="follow-card-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
