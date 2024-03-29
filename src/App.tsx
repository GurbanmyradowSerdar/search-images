import {
  Box,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container, Stack } from "@mui/system";
import { useState } from "react";
import { AxiosInstance } from "./core/utils";
import { ISearchResponse, Photo } from "./data/modul";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosRequestConfig } from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [array, setArray] = useState<Photo[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [page, setPage] = useState(1);

  function searching(search: string, isEmpty: boolean, number: number) {
    if (isEmpty) {
      setArray([]);
      setPage(1);
    }
    setIsDisabled(true);

    AxiosInstance.get<ISearchResponse, AxiosRequestConfig>(
      `search?page=${number}&per_page=10&query=${search}`
    )
      .then((response) => {
        if (isEmpty) {
          setArray(response.data.photos);
        } else {
          setArray([...array, ...response.data.photos]);
        }
      })
      .catch(() => {
        errorMessage();
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  function openOriginalImage(url: string) {
    window.open(url);
  }

  function errorMessage() {
    toast.error("Something went wrong", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <Container>
      <Stack spacing={4} p={2}>
        <Stack
          alignItems={"center"}
          spacing={3}
          sx={{
            fontSize: {
              xs: "11px",
              sm: "12px",
              md: "14px",
              lg: "18px",
            },
          }}
        >
          <Typography sx={{ fontSize: "1.6em" }}>
            Search your favorite photos here
          </Typography>
          <Stack alignItems={"center"} spacing={3}>
            <TextField
              placeholder="Search..."
              size="medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? searching(search, true, 1) : null
              }
            />
            <LoadingButton
              variant="contained"
              onClick={() => {
                searching(search, true, 1);
              }}
              sx={{ fontSize: "1em" }}
              disabled={isDisabled}
              loadingPosition="center"
              loading={isDisabled}
              loadingIndicator={<CircularProgress size={25} />}
            >
              Search
            </LoadingButton>
          </Stack>
        </Stack>
        <Box>
          <Stack alignItems={"center"} spacing={3}>
            <Grid container spacing={3}>
              {array === null || array === undefined
                ? null
                : array.map((item, i) => {
                    return (
                      <Grid item key={i} xs={12} md={6} lg={4}>
                        <Card elevation={8} sx={{ padding: "10px" }}>
                          <Stack
                            spacing={2}
                            alignItems={"center"}
                            sx={{
                              fontSize: {
                                xs: "11px",
                                sm: "12px",
                                md: "14px",
                                lg: "16px",
                              },
                            }}
                          >
                            <img
                              src={item.src.medium}
                              alt={item.photographer}
                              style={{
                                objectFit: "contain",
                              }}
                            />
                            <LoadingButton
                              variant="contained"
                              color="success"
                              sx={{ fontSize: "0.9em" }}
                              onClick={() => {
                                openOriginalImage(item.src.original);
                              }}
                              disabled={isDisabled}
                              loadingPosition="center"
                              loading={isDisabled}
                              loadingIndicator={<CircularProgress size={10} />}
                            >
                              Open original
                            </LoadingButton>
                          </Stack>
                        </Card>
                      </Grid>
                    );
                  })}
            </Grid>
            {array.length > 0 ? (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ fontSize: "0.9em" }}
                onClick={() => {
                  setPage(page + 1);
                  searching(search, false, page + 1);
                }}
                disabled={isDisabled}
                loadingPosition="center"
                loading={isDisabled}
                loadingIndicator={<CircularProgress size={20} />}
              >
                More
              </LoadingButton>
            ) : null}
          </Stack>
        </Box>
        <ToastContainer />
      </Stack>
    </Container>
  );
}
export default App;
