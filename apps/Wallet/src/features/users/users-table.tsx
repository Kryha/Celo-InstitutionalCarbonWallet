"use client";

import { ROLES, User } from "@/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { useGetUsers, useUpdateUser } from "./services";
import { renderUserRole } from "./utils";

function UpdateRoleMenu({ user }: { user: User }) {
  const { mutate: updateUser, isLoading: isUpdatingUser } = useUpdateUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateRole = (role: User["role"]) => {
    updateUser({
      role,
      name: user.name,
      publicKey: user.publicKey,
      emailAddress: user.emailAddress,
    });
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="secondary"
        disabled={isUpdatingUser}
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
            onClick={() => updateRole(role)}
          >
            {renderUserRole(role)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export function UsersTable() {
  const { data: users = [] } = useGetUsers();

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
