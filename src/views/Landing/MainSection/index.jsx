import {
  Box,
  Grid,
  Typography,
  styled,
  Pagination,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
// or
import { clsx } from "clsx";
import WikiPage from "../../WikiPage";
import {
  DeleteProject,
  getAllPosts,
  getAllProjects,
} from "../../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { ThreeDots } from "react-loader-spinner";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useTranslation } from "react-i18next";
import EventsPage from "../../EventsPage";
import BlockSection from "../../BlockSection/BlockSection";
import News from "../../NEWS";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { tabChangeAction } from "../../../store/actions/tabChangeActions";
import { CompetetionTabs } from "../../CompetetionPage/components/CompetitionHome";
import Test from "./Test";

const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(1),
  background: "#f2f2f2",
}));

const imgData = [];

const MainSection = () => {
  const { state } = useLocation();
  const theme = useTheme();
  // const [isFirstProject, setIsFirstProject] = useState(true);
  const [Gproject, setGproject] = useState([]);
  const [gridColumns, setGridColumns] = useState(4);
  const [posts, setPosts] = React.useState([]);
  const [projects, setProject] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [newes, setNewes] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabValue = useSelector((state) => state.tab.tabValue);
  // console.log("tabValue in Main Section====", tabValue);

  const { t } = useTranslation();
  // const { scaleDown } = transitions;

  const postsPerPage = 6;
  const projectsPerPage = 5;

  const dispatch = useDispatch();

  const getAllProject = () => {
    setLoading(true);
    dispatch(getAllProjects())
      .then((res) => {
        // console.log(res.data.payload);

        setProject(res.data.payload);
        setLoading(false);
        // console.log(res.data.payload)
        setGproject(res.data.payload[0]);
        // console.log(res.data.payload[0]);
        if (res.data.payload[0]) {
          setGridColumns(8);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (projects.length > 0) {
      const newImgData = projects.map((project) => project.image);
      imgData.push(...newImgData);
    }
  }, [projects]);

  React.useEffect(() => {
    getAllProject();
  }, []);

  const getPosts = () => {
    setLoading(true);
    dispatch(getAllPosts())
      .then((result) => {
        setPosts(result.data.payload);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  React.useEffect(() => {
    if (tabValue === "postsection") {
      console.log("in useEffect condition========");
      getPosts();
    }
  }, [tabValue]);

  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % imgData.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? imgData?.length - 1 : prevImage - 1
    );
  };
  const handleClickBox = (projectId) => {
    navigate(`/single-post/${projectId}`);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //project pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice();
  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    event.preventDefault();
  };
  console.log(tabValue);
  const handleDelete = (id) => {
    dispatch(DeleteProject(id))
      .then((res) => {
        if (res.status == 200) {
          console.log("blaaa blaaa blaaa");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(projects.id)
  const handleImageClick = (id) => {
    navigate(`/viewproject/${id}`, { state: { projectData: projects } });
  };

  const handleTabChange = (name) => {
    console.log("name", name);

    setSelectedTab(name);
    dispatch(tabChangeAction(name));
  };

  return (
    <div>
      <StyledRoot>
        {tabValue === "postsection" && (
          <Stack spacing={7}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ThreeDots
                  height="85"
                  width="80"
                  radius="9"
                  color="#3e50ce"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </Box>
            ) : (
              <div
                style={{
                  width: "60%",
                  margin: "0 auto",
                  padding: "30px 0",
                }}
              >
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1020: 3 }}
                >
                  <Masonry columnsCount={3} gutter={10}>
                    {posts.map((post, index) => (
                      <Stack
                        key={index}
                        sx={{
                          borderRadius: "10px",
                          backgroundColor: "#d3d3d3",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ width: "100%", height: "100%" }}>
                          <img
                            src={`${process.env.REACT_APP_URL}${post.image}`}
                            alt={post.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          />
                        </Box>

                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          {post.title}
                        </Typography>
                      </Stack>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            )}
            <Pagination
              count={Math.ceil(posts.length / postsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                "& .Mui-selected": {
                  backgroundColor: "#000000",
                  color: "#fff",
                },
              }}
            />
          </Stack>
        )}

        {tabValue === "projectsection" && (
          <>
            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: "bold", textAlign: "center", mt: 2 }}
            >
              {t("projectsection")}
            </Typography>
            {/* <Grid container spacing={2} sx={{ px: 10, py: 4 }}>
              {currentProjects.map((project, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={6}
                  lg={index === 0 ? 8 : 4}
                  sx={{ boxShadow: 2 }}
                >
                  <Carousel showArrows={true} showThumbs={false}>
                    {project.image.map((val, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="image-slide"
                        onClick={() => handleImageClick(project.id)}
                      >
                        <img
                          src={val.image}
                          alt={`Project ${imageIndex + 1}`}
                          style={{
                            height: "400px",
                            objectFit: "cover",
                            width: "100%",
                            userSelect: "none",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    {project.description}
                  </Typography>
                </Grid>
              ))}
            </Grid> */}

            <div className="grid grid-cols-3 gap-x-4 gap-y-6 px-10 py-10">
              {currentProjects.map((project, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-2 bg-zinc-200 ${
                    index === 0 ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <Carousel showArrows={true} showThumbs={false}>
                    {project.image.map((val, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="image-slide"
                        onClick={() => handleImageClick(project.id)}
                      >
                        <img
                          src={val.image}
                          alt={`Project ${imageIndex + 1}`}
                          style={{
                            height: "400px",
                            objectFit: "cover",
                            width: "100%",
                            userSelect: "none",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className="py-6">
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      {project.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>

            {/* <div class="grid grid-cols-3 gap-4">
              <div class="...">01</div>
              <div class="...">02</div>
              <div class="...">03</div>
              <div class="col-span-2 ">04</div>
              <div class="...">05</div>
            </div> */}

            <Pagination
              count={Math.ceil(projects.length / projectsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                "& .Mui-selected": {
                  backgroundColor: "#000000",
                  color: "#fff",
                },
              }}
            />
          </>
        )}
        {tabValue === "Wiki" && <WikiPage />}
        {tabValue === "Competitions" && <CompetetionTabs />}
        {tabValue === "Events" && <EventsPage />}
        {tabValue === "Blogs" && <BlockSection />}
        {tabValue === "News" && <News />}
      </StyledRoot>
    </div>
  );
};
export default MainSection;
