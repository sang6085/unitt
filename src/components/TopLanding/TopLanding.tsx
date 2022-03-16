import { Avatar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const pageList = [
  {
    url: "/templates/react/react-free/",
    impressions: "84.873",
    impressionsGrowth: "34.76",
    clicks: "15.594",
    clicksGrowth: "28.75",
  },
  {
    url: "/templates/react/react-free/",
    impressions: "84.873",
    impressionsGrowth: "34.76",
    clicks: "15.594",
    clicksGrowth: "28.75",
  },
  {
    url: "/templates/react/react-free/",
    impressions: "84.873",
    impressionsGrowth: "34.76",
    clicks: "15.594",
    clicksGrowth: "28.75",
  },
];
const TopLanding = () => {
  return (
    <Box>
      <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #9e9e9e" }}>
        <Typography component="h2" sx={{ fontSize: 15, fontWeight: "bold" }}>
          Top Landing Pages
        </Typography>
      </Box>

      <Box sx={{ px: 3 }}>
        {pageList.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              py: 2,
              borderBottom: index !== pageList.length - 1 ? "1px solid #9e9e9e" : "none",
            }}
          >
            <Avatar
              sx={{ bgcolor: "#e8eaee", color: "#000", fontWeight: "600", fontSize: 15 }}
              alt=""
              src=""
            >
              {index + 1}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, px: 2, py: 1 }}>
              <Typography>{item.url}</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: 14 }}>Impressions</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                      {item.impressions}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        background: "#44d6001a",
                        color: "#44d600",
                        px: 1,
                        py: 0.5,
                        borderRadius: 5,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {item.impressionsGrowth}%
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
                  <Typography sx={{ fontSize: 14 }}>Clicks</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                      {item.clicks}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        background: "#44d6001a",
                        color: "#44d600",
                        px: 1,
                        py: 0.5,
                        borderRadius: 5,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {item.clicksGrowth}%
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button sx={{ textTransform: "unset", fontWeight: 600 }}>Visit URL</Button>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: 3,
          borderTop: "1px solid #9e9e9e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" sx={{ fontSize: 15, textTransform: "unset", fontWeight: 600 }}>
          Advanced View
        </Button>
      </Box>
    </Box>
  );
};

export default TopLanding;
