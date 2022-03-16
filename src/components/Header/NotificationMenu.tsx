import { Box, ListItemIcon, MenuItem, Typography, Divider, Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import { BadgeAvatar } from "../Avatar/Avatar";
import { green } from "@mui/material/colors";
import MenuComponent, { IMenu } from "../Menu/Menu";

interface IFile {
  link: string;
  capacity: string;
}

interface IAvatar {
  alt: string;
  src: string;
}

interface INotification {
  online?: boolean;
  avatar?: IAvatar;
  name?: string;
  time: string;
  files?: IFile[];
  qty_new_message?: number;
}

const NotificationMenu = (props: IMenu) => {
  return (
    <MenuComponent {...props}>
      <Box sx={{ width: 470, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 40,
            px: 2,
          }}
        >
          <Typography component="h2" sx={{ fontWeight: 500 }}>
            Notifications
          </Typography>
          <LinkComponent href="#" label="Mard all as read" />
        </Box>

        <Divider />

        <Box sx={{ px: 2, py: 1, display: "flex", flexGrow: 1, flexDirection: "column" }}>
          <MissedCall
            avatar={{
              alt: "Remy Sharp",
              src: "/static/images/avatar/1.jpg",
            }}
            online={false}
            name="James Dias"
            time="less than a minnute ago"
          />

          <CreateTicket
            avatar={{
              alt: "Remy Sharp",
              src: "/static/images/avatar/1.jpg",
            }}
            online={true}
            name="Randy Shepard"
            time="about 3 hours ago"
          />

          <SendFileNotification
            avatar={{
              alt: "Remy Sharp",
              src: "/static/images/avatar/1.jpg",
            }}
            online={false}
            name="Sarah James"
            time="1 day ago"
            files={[
              {
                link: "BalanceReports.pdf",
                capacity: "187KB",
              },
              {
                link: "BalanceReports.pdf",
                capacity: "187KB",
              },
            ]}
          />

          <NewMessage online={false} name="Sarah James" time="3 days ago" qty_new_message={54} />
        </Box>

        <Divider />

        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
          }}
        >
          <Typography component="span" sx={{ fontSize: 15, fontWeight: 500 }}>
            View all notifition
          </Typography>
        </MenuItem>
      </Box>
    </MenuComponent>
  );
};

const LinkComponent = (props: { href: string; label: string }) => {
  return (
    <Link to={props.href} style={{ textDecoration: "revert", fontSize: 14, color: "#5569ff" }}>
      {props.label}
    </Link>
  );
};

const MissedCall = (props: INotification) => {
  const avatar = props?.avatar ?? { alt: "", src: "" };
  return (
    <MenuItem
      sx={{
        my: 1,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        display: "flex",
        flexGrow: 1,
        background: "#2233541a",
      }}
    >
      <ListItemIcon sx={{ mr: 1 }}>
        {props.online ? (
          <BadgeAvatar>
            <Avatar
              alt={avatar.alt}
              src={avatar.src}
              sx={{ width: "40px !important", height: "40px !important" }}
            />
          </BadgeAvatar>
        ) : (
          <Avatar
            alt={avatar.alt}
            src={avatar.src}
            sx={{ width: "40px !important", height: "40px !important" }}
          />
        )}
      </ListItemIcon>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography component="h3" sx={{ fontWeight: 600, fontSize: 15 }}>
            {props.name}
          </Typography>
          <Typography component="span" sx={{ fontSize: 13, color: "#9e9e9e", fontWeight: 300 }}>
            {props.time}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography component="span" sx={{ color: "red", fontSize: 14 }}>
            Missed Call
          </Typography>
          <Typography component="span" sx={{ fontSize: 14, color: "#9e9e9e" }}>
            -- I"ll be in your neighborhood...
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

const CreateTicket = (props: INotification) => {
  const avatar = props?.avatar ?? { alt: "", src: "" };

  return (
    <MenuItem sx={{ my: 1, px: 1.5, py: 1, borderRadius: 1, display: "flex", flexGrow: 1 }}>
      <ListItemIcon sx={{ mr: 1 }}>
        {props.online ? (
          <BadgeAvatar>
            <Avatar
              alt={avatar.alt}
              src={avatar.src}
              sx={{ width: "40px !important", height: "40px !important" }}
            />
          </BadgeAvatar>
        ) : (
          <Avatar
            alt={avatar.alt}
            src={avatar.src}
            sx={{ width: "40px !important", height: "40px !important" }}
          />
        )}
      </ListItemIcon>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography component="h3" sx={{ fontWeight: 600, fontSize: 15 }}>
            {props.name}
          </Typography>
          <Typography component="span" sx={{ fontSize: 13, color: "#9e9e9e", fontWeight: 300 }}>
            {props.time}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography component="span" sx={{ fontSize: 14, color: "#9e9e9e" }}>
            Create a new ticket: <LinkComponent href="#" label="Header Bug Report" />
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

const NewMessage = (props: INotification) => {
  return (
    <Box sx={{ my: 1, px: 1.5, py: 1, borderRadius: 1, display: "flex", flexGrow: 1 }}>
      <ListItemIcon>
        <Avatar sx={{ bgcolor: green[500], width: "40px !important", height: "40px !important" }}>
          <ChatIcon />
        </Avatar>
      </ListItemIcon>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography component="h3" sx={{ fontWeight: 600 }}>
            Messaging Platform
          </Typography>
          <Typography component="span" sx={{ fontSize: 13, color: "#9e9e9e", fontWeight: 300 }}>
            {props.time}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography component="span" sx={{ fontSize: 14, fontWeight: 600 }}>
            {props.qty_new_message ?? 0}{" "}
            <Typography component="span" sx={{ color: "#9e9e9e", fontSize: 14 }}>
              new messages in your inbox
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const SendFileNotification = (props: INotification) => {
  const avatar = props?.avatar ?? { alt: "", src: "" };

  return (
    <Box
      sx={{
        my: 1,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        display: "flex",
        alignItems: "flex-start",
        flexGrow: 1,
      }}
    >
      <ListItemIcon>
        {props.online ? (
          <BadgeAvatar>
            <Avatar
              alt={avatar.alt}
              src={avatar.src}
              sx={{ width: "40px !important", height: "40px !important" }}
            />
          </BadgeAvatar>
        ) : (
          <Avatar
            alt={avatar.alt}
            src={avatar.src}
            sx={{ width: "40px !important", height: "40px !important" }}
          />
        )}
      </ListItemIcon>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography component="h3" sx={{ fontWeight: 600, fontSize: 14 }}>
            {props.name}
          </Typography>
          <Typography component="span" sx={{ fontSize: 13, color: "#9e9e9e", fontWeight: 300 }}>
            {props.time}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography component="span" sx={{ color: "#9e9e9e", fontSize: 14 }}>
            Added some files to <LinkComponent href="#" label="Marketing tasks" /> section.
          </Typography>
        </Box>
        {props.files ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              px: 2,
              py: 1,
              mt: 1,
              boxShadow: 2,
              borderRadius: 1,
              background: "#22335405",
              flexWrap: "wrap",
            }}
          >
            {props?.files.map((item, index) => (
              <Box sx={{ display: "flex", flexDirection: "row" }} key={index}>
                <DescriptionOutlinedIcon sx={{ fontSize: 28 }} />
                <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
                  <LinkComponent href="#" label={item.link} />
                  <Typography component="p" sx={{ fontSize: 13, color: "#9e9e9e" }}>
                    {item.capacity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default NotificationMenu;
