import { Grid, Pagination } from '@mui/material'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { getAllProjects } from '../../../store/actions/userActions';
import { ThreeDots } from 'react-loader-spinner';

const ProfileProjects = () => {
  const projectsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [projects, setProject] = React.useState([])
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const [projectLoading, setProjectLoading] = useState(false)
  
  const dispatch = useDispatch()

  const getAllProject = () => {
      setProjectLoading(true)
    dispatch(getAllProjects()).then((res) => {
        setProjectLoading(false)
        setProject(res.data.payload)
    }).catch((err) => {
        setProjectLoading(false)
      // setLoading(false)
      console.log(err)
    })

  }
  React.useEffect(() => {
    getAllProject()
  }, [])

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    event.preventDefault();
  };




  return (
    <div>
       <Grid container spacing={2}>
              {
              projectLoading ? 
              <ThreeDots 
              height="100" 
              width="100" 
              radius="9"
              color="#3e50ce" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              />
              :
              currentProjects.map((project, index) => (
                <Grid item key={index} xs={12} md={6} lg={index == 0 ? 8 : 4}>
                  <Carousel showArrows={true} showThumbs={false} >
                    {project.image.map((val, imageIndex) => (
                      <div key={imageIndex} className="image-slide">

                        <img

                          src={val.image}
                          alt={`Project ${imageIndex + 1}`}

                          style={{ height: "400px", objectFit: "cover", width: "100%", userSelect: 'none' }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <p className='text-1xl, font-semibold' >{project.title}</p>
                  <p className='text-1xl, font-semibold'>{project.description}</p>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(projects.length / projectsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
                '& .Mui-selected': {
                  backgroundColor: '#000000',
                  color: '#fff',
                },
              }}
            />
    </div>
  )
}

export default ProfileProjects
