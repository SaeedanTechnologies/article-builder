import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { useLocation, useParams } from 'react-router';

const ViewProject = () => {
    const location = useLocation();
    const { id } = useParams()
    console.log(id)
    const projectId = id;
    const projectData = location.state.projectData;

    // console.log(location.state);
    // console.log(projectData, projectId);

    // Use the find method to locate the specific project based on its ID
    const selectedProject = projectData.find(project => project.id == projectId);
    // console.log(projectData, 'l');
    // console.log(projectId, 'ly');
    // if (!selectedProject || !selectedProject.image || !Array.isArray(selectedProject.image)) {
    //     return (
    //         <Typography variant="h6">
    //             Project data not found or is invalid.
    //         </Typography>
    //     );
    // }
    console.log(selectedProject, "sys")
    return (
        <>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6} sx={{}}>
                    <Carousel
                        showArrows={true}
                        showThumbs={true}
                        thumbWidth={230}
                    // thumbHeight={200}
                    >
                        {selectedProject.image.map((val, imageIndex) => (
                            <div key={imageIndex} className="image-slide">
                                {console.log(val)}
                                <img
                                    src={val.image}
                                    alt={`Project ${imageIndex + 1}`}
                                    style={{
                                        height: '350px',
                                        objectFit: "cover",
                                        width: "100%",
                                        userSelect: 'none',
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {selectedProject.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {selectedProject.description}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default ViewProject;
