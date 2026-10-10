import styles from "../home.module.css";
import Icon from "../../../shared/components/icons/icons";
import { rooms } from "../mocks/rooms";

export default function RoomList() {
  return (
    <>
      <div
        className={styles.roomScroll}
        role="region"
        aria-label="Lista de salas ilustrativas"
        tabIndex={0}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room) => (
            <li key={room.name} className={`${styles.room} ${styles[room.color]}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={styles.roomCategoryDot} aria-hidden="true" />
                <span
                  className={`${styles.occupancy} ${room.players === 8 ? styles.full : ""}`}
                  aria-label={`${room.players} de 8 jogadores${room.players === 8 ? ", sala cheia" : ""}`}
                >
                  <Icon name={room.players === 8 ? "lock" : "users"} />
                  <span>
                    {room.players}
                    <span className={styles.capacity}>/8</span>
                  </span>
                </span>
              </div>
              <h3 className={styles.roomName}>{room.name}</h3>
              <p className={styles.roomCategory}>{room.category}</p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${styles.roomCaption} flex flex-wrap items-center justify-between gap-x-4 gap-y-1`}
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