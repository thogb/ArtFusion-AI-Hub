import { TokenDto } from "@/dtos/TokenDto";

const isTokenValid = (token: TokenDto | null) => {
  return token != null && new Date(token.expiresAt) > new Date();
};

export default {
  isTokenValid,
};
