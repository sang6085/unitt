import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  boxLeft: {
    padding: "24px", 
    minWidth: 250, 
    height: "100%"
  },
  titleLeft: {
    marginLeft: "15px", 
    marginBottom: "8px"
  },
  actionIcon: {
    color: "#ff0000b8", 
    fontSize: 22
  },
  avatar: {
    width: 40, 
    height: 40, 
    marginRight: 8, 
    borderRadius: 8
  },
  titleMode: {
    fontSize: 15, 
    color: "#9e9e9e"
  },
  BeenhereIcon: {
    fontSize: 28, 
    marginRight: "8px", 
    color: "#2196f3"
  },
  boxRight: {
    padding: "24px", 
    minWidth: 600, 
    height: "100%"
  }, 
  itemsCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  txtPermission: {
    fontSize: 15, 
    fontWeight: 700, 
    marginRight: "16px !important"
  }
})