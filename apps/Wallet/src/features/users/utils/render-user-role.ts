import { User } from "@/types";

export function renderUserRole(role: User["role"]) {
  switch (role) {
    case "REGISTERED": {
      return "Registered";
    }

    case "TRADER": {
      return "Trader";
    }

    case "ADMIN": {
      return "Admin";
    }

    default: {
      return "";
    }
  }
}
