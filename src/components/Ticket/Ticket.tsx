import { Box, Checkbox, Typography, FormControlLabel } from "@mui/material";
import React from "react";
import "./Ticket.scss";

interface ITicket {
  serial: number | string;
  type: string;
  case: string;
  area: string;
  line: string;
  tem_expired_date: string[];
}

const Ticket = (props: ITicket) => {
  //   const styles = useStyles();
  const price = 50000;
  const dayOfMonth: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const getMonth = new Date().getMonth() + 1;
  const getYear = new Date().getFullYear();
  const months = [];

  while (months.length < 3) {
    months.push(getMonth + months.length > 12 ? 1 : getMonth + months.length);
  }

  const [chooseMonth, setChooseMonth] = React.useState<
    { month: number; year: number; bought: boolean }[]
  >([]);

  React.useEffect(() => {
    const getData = async () => {
      const date = await props.tem_expired_date.map((item) => {
        return {
          month: new Date(item).getMonth() + 1,
          year: new Date(item).getFullYear(),
          bought: true,
        };
      });
      setChooseMonth(date);
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseMonth = (month: number, year: number) => {
    const checkMonth = chooseMonth.findIndex((e) => e?.month === month);
    if (checkMonth === -1) {
      setChooseMonth(
        chooseMonth.concat({
          month: month,
          year: year,
          bought: false,
        })
      );
    } else {
      setChooseMonth(chooseMonth.filter((e) => e.month !== month));
    }
  };

  const checkYear = (month: number) => {
    return month >= getMonth ? getYear : getYear + 1;
  };

  const total =
    price *
    chooseMonth.reduce(
      (previousValue: number, currentValue: { month: number; bought: boolean }) => {
        if (!currentValue.bought) {
          return previousValue + 1;
        }
        return previousValue;
      },
      0
    );

  console.log(chooseMonth);

  return (
    <Box sx={{ height: "100%", p: 4, background: "#222339", display: "inline-flex" }}>
      <Box className="ticket">
        <Box className="ticket__title">
          <Box className="ticket__title__content">
            <Box>
              <Box
                component="p"
                sx={{
                  background: "#fe696a",
                  color: "#fff",
                  borderRadius: 1,
                  padding: 0.8,
                  display: "inline",
                }}
              >
                {props.type === "Bình thường" ? "NORMAL" : "VIP"}
              </Box>
            </Box>
            <Typography component="h1" variant="h5" sx={{ color: "#000", fontWeight: 700 }}>
              Vé/Thẻ xe buýt
            </Typography>
            <Typography component="p" sx={{ color: "#9e9e9e", fontWeight: 600, fontSize: 14 }}>
              {props.serial}
            </Typography>
          </Box>
          <Box className="ticket__title__border" />
        </Box>
        <Box className="ticket__info">
          <Typography component="h2" variant="h6" sx={{ color: "#000" }}>
            Thông tin thẻ
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
              <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: "#9e9e9e" }}>
                Đối tượng
              </Typography>
              <Typography component="h3" sx={{ fontWeight: 700, color: "#000" }}>
                {props.case}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
              <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: "#9e9e9e" }}>
                Loại thẻ
              </Typography>
              <Typography component="h3" sx={{ fontWeight: 700, color: "#000" }}>
                {props.type}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
              <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: "#9e9e9e" }}>
                Khu vực
              </Typography>
              <Typography component="h3" sx={{ fontWeight: 700, color: "#000" }}>
                {props.area}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
              <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: "#9e9e9e" }}>
                Tuyến OCP02
              </Typography>
              <Typography component="h3" sx={{ fontWeight: 700, color: "#000" }}>
                {props.line}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: "#9e9e9e" }}>
              Chọn tháng
            </Typography>
            {months.map((month) => (
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FormControlLabel
                  disabled={
                    chooseMonth?.findIndex(
                      (e) => e.month === month && e.bought && e.year === checkYear(month)
                    ) !== -1
                  }
                  control={
                    <Checkbox
                      size="small"
                      checked={chooseMonth?.findIndex((e) => e.month === month) !== -1}
                      onChange={() => handleChooseMonth(month, checkYear(month))}
                    />
                  }
                  label={`Tháng ${month}/${checkYear(month)}`}
                  sx={{ "& span": { fontSize: 14, color: "#000" } }}
                />

                {chooseMonth?.findIndex((e) => e.month === month && !e.bought && e.year) !== -1 ? (
                  <Typography sx={{ fontSize: 13, color: "#000" }}>
                    Ngày hết hạn: {dayOfMonth[month]}/{month}/{checkYear(month)}
                  </Typography>
                ) : chooseMonth?.findIndex(
                    (e) => e.month === month && e.bought && e.year === checkYear(month)
                  ) !== -1 ? (
                  <Typography sx={{ fontSize: 13, color: "#9e9e9e" }}>
                    Tháng này đã được mua
                  </Typography>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="ticket__price">
          <Box className="ticket__price__content">
            <Typography component="h3" sx={{ color: "#000", fontWeight: 500, fontSize: 18 }}>
              Thành tiền:
            </Typography>
            <Typography component="h3" sx={{ color: "#000", fontWeight: 600, fontSize: 28 }}>
              {total.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
            </Typography>
          </Box>
          <Box className="ticket__price__border" />
        </Box>
      </Box>
    </Box>
  );
};

export default Ticket;
