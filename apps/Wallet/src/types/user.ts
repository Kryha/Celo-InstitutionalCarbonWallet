export const ROLES = ["REGISTERED", "TRADER", "ADMIN"] as const;
type Role = (typeof ROLES)[number];

export type User = {
  name: string;
  publicKey: string;
  emailAddress: string;
  role: Role;
  safeAddress: string;
};
