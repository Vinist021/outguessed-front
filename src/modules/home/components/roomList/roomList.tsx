import Icon from "@/shared/components/icons/icons";
import { rooms } from "@/modules/home/mocks/rooms";
import "./roomList.css";

export default function RoomList() {
  return (
    <>
      <div
        className="homeRoomScroll"
        role="region"
        aria-label="Lista de salas ilustrativas"
        tabIndex={0}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <li key={room.name} className={`homeRoom homeRoom--${room.color}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="homeRoomCategoryDot" aria-hidden="true" />
                <span
                  className={`homeOccupancy ${room.players === 8 ? "homeFull" : ""}`}
                  aria-label={`${room.players} de 8 jogadores${room.players === 8 ? ", sala cheia" : ""}`}
                >
                  <Icon name={room.players === 8 ? "lock" : "users"} />
                  <span>
                    {room.players}
                    <span className="homeCapacity">/8</span>
                  </span>
                </span>
              </div>
              <h3 className="homeRoomName">{room.name}</h3>
              <p className="homeRoomCategory">{room.category}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="homeRoomCaption flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="info" />
          Salas ilustrativas
        </span>
        <span>Até 8 jogadores por sala</span>
      </div>
    </>
  );
}
