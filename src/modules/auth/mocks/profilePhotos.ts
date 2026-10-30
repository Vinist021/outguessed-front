export type ProfilePhoto = {
  id: string;
  name: string;
  src: string;
};

export const profilePhotos = [
  { id: "default", name: "Padrão", src: "/avatars/default.svg" },
  { id: "cat", name: "Gato", src: "/avatars/cat.svg" },
  { id: "fox", name: "Raposa", src: "/avatars/fox.svg" },
  { id: "bear", name: "Urso", src: "/avatars/bear.svg" },
  { id: "rabbit", name: "Coelho", src: "/avatars/rabbit.svg" },
  { id: "owl", name: "Coruja", src: "/avatars/owl.svg" },
] as const satisfies readonly ProfilePhoto[];

export type ProfilePhotoId = (typeof profilePhotos)[number]["id"];

export const defaultProfilePhoto = profilePhotos[0];
