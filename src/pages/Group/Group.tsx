import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { insertByGroupId } from "../../services/MenuGroupService";
import { useTranslation } from "react-i18next";
import GroupComponent from "./GroupComponent";
import MenuComponent from "./MenuComponent";

const Group = () => {
  const { t } = useTranslation();
  const [valueSelect, setValueSelect] = React.useState<any>();
  const [valueGroup, setValueGroup] = React.useState<any>();
  const [valueMenu, setValueMenu] = React.useState<any>([]);
  const [arr, setArr] = React.useState<any>([]);
  const updateArrFunc = (array: any) => setArr(array);

  const handleChangeMenuValue = (data: any) => {
    setValueMenu(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGroup(event.target.id as any);
    setValueSelect(event.target.value as any);
  };

  const handleSave = (arr: any) => {
    if (valueGroup === undefined || arr === []) {
      return;
    } else {
      insertByGroupId(valueGroup, { menuId: arr });
    }
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          Menu Group
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 6 }}>
            <Button variant="contained" onClick={() => handleSave(arr)}>
              {t(`button.save`)}
            </Button>
          </Box>
        </Typography>
      </Box>
      <Box className="content">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: 10,
          }}
        >
          <Box sx={{ width: "30%" }}>
            <GroupComponent
              handleChange={handleChange}
              valueGroup={valueGroup}
              valueSelect={valueSelect}
            />
          </Box>
          <Box sx={{ width: "60%" }}>
            <MenuComponent
              updateArrFunc={updateArrFunc}
              valueMenu={valueMenu}
              handleChangeMenuValue={handleChangeMenuValue}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
