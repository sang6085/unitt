import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { insertByGroupId } from "../../services/MenuGroupService";
import { useTranslation } from "react-i18next";
import GroupComponent from "./components/TableGroup";
import MenuComponent from "./components/TableMenu";

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
      <Box className="add-btn">
        <Button variant="contained" onClick={() => handleSave(arr)}>
          {t(`button.save`)}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Box sx={{ width: "33%" }}>
          <GroupComponent
            handleChange={handleChange}
            valueGroup={valueGroup}
            valueSelect={valueSelect}
          />
        </Box>
        <Box sx={{ width: "63%" }}>
          <MenuComponent
            updateArrFunc={updateArrFunc}
            valueMenu={valueMenu}
            handleChangeMenuValue={handleChangeMenuValue}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
