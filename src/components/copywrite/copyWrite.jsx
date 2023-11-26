import { Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography
      variant={props.variant}
      m={6}
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        style={{ color: "#311edd" }}
        target="_blank"
        rel="noreferrer"
        href="https://abdallahosama55.github.io/Abdallah-Osama-portfolio/"
      >
        Abdallah Osama 
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
