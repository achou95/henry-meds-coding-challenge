import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  let navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>404 Not Found</h1>
      <Button
        variant="outlined"
        onClick={() => {
         navigate("/");
        }}
      >
        Back to home page
      </Button>
    </div>
  )
}