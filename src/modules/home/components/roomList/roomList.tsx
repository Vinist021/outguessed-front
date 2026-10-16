import Icon from "@/shared/components/icons/icons";
import { rooms } from "@/modules/home/mocks/rooms";
import styles from "./roomList.module.css";

const roomAccentClasses = {
  cyan: styles.homeRoomCyan,
  mint: styles.homeRoomMint,
  pink: styles.homeRoomPink,
  yellow: styles.homeRoomYellow,
} satisfies Record<(typeof rooms)[number]["color"], string>;

export default function RoomList() {
  return (
    <>
      <div
        className={styles.homeRoomScroll}
        role="region"
        aria-label="Lista de salas ilustrativas"
        tabIndex={0}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <li key={room.name} className={`${styles.homeRoom} ${roomAccentClasses[room.color]}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={styles.homeRoomCategoryDot} aria-hidden="true" />
                <span
                  className={[styles.homeOccupancy, room.players === 8 && styles.homeFull]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`${room.players} de 8 jogadores${room.players === 8 ? ", sala cheia" : ""}`}
                >
                  <Icon name={room.players === 8 ? "lock" : "users"} />
                  <span>
                    {room.players}
                    <span className={styles.homeCapacity}>/8</span>
                  </span>
                </span>
              </div>
              <h3 className={styles.homeRoomName}>{room.name}</h3>
              <p className={styles.homeRoomCategory}>{room.category}</p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${styles.homeRoomCaption} flex flex-wrap items-center justify-between gap-x-4 gap-y-1`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Icon name="info" />
          Salas ilustrativas
        </span>
        <span>Até 8 jogadores por sala</span>
      </div>
    </>
  );
}
