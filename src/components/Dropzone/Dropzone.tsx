import { Box } from "@mui/material";
import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useTheme } from "../../Contexts/ThemeContext";

interface IPDropZone{
  setFilesChoose?: any
}
const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
    boxDropZone: (props: { color: string }) => {
      return {
        color: `${props.color} !important`,
        borderColor: `${props.color} !important`,
        "& .MuiDropzoneArea-icon": {
          color: `${props.color} !important`,
        },
        "& .MuiDropzoneArea-text":{
          fontSize: "20px !important",
        }
      };
    },
  })
);

const DropZone: React.FC<IPDropZone> = ({setFilesChoose}) => {
  const useThemeContext = useTheme();
  const classes = useStyles({
    color: useThemeContext.colorTheme,
  });
  const handleChangeFile = (files: any) => {
    // console.log(files);
    setFilesChoose(files)
  };
  return (
      <DropzoneArea
        classes={{
          root: classes.boxDropZone,
        }}
        onChange={(files) => handleChangeFile(files)}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{
          container: {
            spacing: 1,
            direction: "row",
          },
        }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
      />
  );
};

export default DropZone;
