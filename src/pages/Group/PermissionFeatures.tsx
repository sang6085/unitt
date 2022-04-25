import { Box } from "@mui/system";
import { insertByGroupId } from "services/MenuGroupService";
import { useTranslation } from "react-i18next";
import GroupComponent from "pages/Group/components/TableGroup";
import MenuComponent from "pages/Group/components/TableMenu";
import { useStyles } from "pages/Group/PermissionFeatureStyles";
import ButtonComponent from "components/Button/Button";
import { useState, ChangeEvent } from "react";

const Group = () => {
  const { t } = useTranslation();
  const [valueSelect, setValueSelect] = useState<any>();
  const [valueGroup, setValueGroup] = useState<any>();
  const [valueMenu, setValueMenu] = useState<any>([]);
  const [arr, setArr] = useState<any>([]);
  const updateArrFunc = (array: any) => setArr(array);
  const classes = useStyles();

  const handleChangeMenuValue = (data: any) => {
    setValueMenu(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <ButtonComponent variant="contained" onClick={() => handleSave(arr)}>
          {t(`button.save`)}
        </ButtonComponent>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.tableGroup} >
          <GroupComponent
            handleChange={handleChange}
            valueGroup={valueGroup}
            valueSelect={valueSelect}
          />
        </Box>
        <Box className={classes.tableMenu} >
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
