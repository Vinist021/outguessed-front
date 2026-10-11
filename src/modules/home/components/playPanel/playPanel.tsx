import Field from "@/shared/components/field/field";
import Icon from "@/shared/components/icons/icons";
import RoomList from "@/modules/home/components/roomList/roomList";
import Button from "@/shared/components/button/button";
import styles from "@/modules/home/home.module.css";
import "./playPanel.module.css";

export default function PlayPanel() {
  return (
    <section className={`${styles.panel} homePlayPanel`} aria-labelledby="play-title">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 id="play-title" className={styles.panelTitle}>
          <Icon name="play" />
          Jogue agora<span className={styles.titleDot}>.</span>
        </h2>
        <div className="homeOnline flex items-center gap-2.5">
          <Icon name="users" />
          <span className="homeOnlineCount" aria-label="Contagem indisponível">
            —
          </span>
          <span>
            jogadores
            <br />
            online
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_auto]">
        <Field
          id="nickname"
          label="Seu apelido"
          icon="user"
          placeholder="Como te chamam?"
          autoComplete="nickname"
        />
        <Field
          id="room-search"
          label="Buscar sala"
          icon="search"
          placeholder="Encontre sua turma"
          type="search"
          autoComplete="off"
        />
        <div
          className="homeRoomTabs flex md:col-span-2 md:justify-self-end xl:col-span-1"
          role="group"
          aria-label="Tipos de sala (ilustrativo)"
        >
          <button type="button" aria-disabled="true" className="homeActiveTab">
            Salas padrão
          </button>
          <button type="button" aria-disabled="true">
            Salas criadas
          </button>
        </div>
      </div>

      <RoomList />

      <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="homeSecondaryActions grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Button>
            <Icon name="info" />
            Info da sala
          </Button>
          <Button>
            <Icon name="bulb" />
            Praticar
          </Button>
          <Button className="homeCreateRoom">
            <Icon name="plus" />
            Criar sala
          </Button>
        </div>
        <Button variant="primary" className="homePlayButton">
          <span>Jogar</span>
          <Icon name="arrow" />
        </Button>
      </div>
    </section>
  );
}
