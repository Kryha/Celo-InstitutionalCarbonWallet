"use client";

import { useWalletStore } from "@/store";
import { ROLES, User } from "@/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MouseEvent, useState } from "react";
import { useAddUser, useGetUsers, useRemoveUser, useUpdateUser } from "./services";
import { renderUserRole } from "./utils";
import toast from "react-hot-toast";

function UpdateRoleMenu({ user }: { user: User }) {
  const { mutate: updateUser, isLoading: isUpdatingUser } = useUpdateUser();
  const { mutate: addUser, isLoading: isAddingUser } = useAddUser();
  const { mutate: removeUser, isLoading: isRemovingUser } = useRemoveUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const pk = useWalletStore((state) => state.privateKey);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateUserRole = (role: User["role"], toastId: string) =>
    updateUser(
      {
        role,
        name: user.name,
        publicKey: user.publicKey,
        emailAddress: user.emailAddress,
      },
      { onSuccess: () => toast.dismiss(toastId) }
    );

  const handleUpdateUserRole = (role: User["role"]) => {
    const toastId = toast.loading("Updating user role, please wait...");

    handleClose();

    if (role === "TRADER") {
      addUser({ pk, address: user.publicKey }, { onSuccess: () => updateUserRole(role, toastId) });
    } else {
      removeUser({ pk, address: user.publicKey }, { onSuccess: () => updateUserRole(role, toastId) });
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="secondary"
        disabled={isUpdatingUser || isAddingUser || isRemovingUser}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {ROLES.map((role) => (
          <MenuItem
            key={role}
            selected={role === user.role}
            onClick={() => handleUpdateUserRole(role)}
          >
            {renderUserRole(role)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function UsersTable() {
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsers();

  if (isLoadingUsers) {
    return (
      <Stack
        width={1}
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Public key</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.publicKey}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="user"
              >
                {user.name}
              </TableCell>
              <TableCell>{user.publicKey}</TableCell>
              <TableCell>
                {renderUserRole(user.role)}
                <UpdateRoleMenu user={user} />
              </TableCell>
              <TableCell>{user.emailAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
