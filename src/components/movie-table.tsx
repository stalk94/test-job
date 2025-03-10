import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogContent,  Rating, Box } from "@mui/material";
import Flag from './flag';
import { useGetMovies, Movie } from "./api";


const MovieRating =({ rating }: { rating: number })=> {
    
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
          }}
        >
            <Rating
                name="movie-rating"
                value={rating / 2}
                precision={0.5}
                readOnly
                size="small"
            />
            <span style={{paddingLeft:'10px'}}>
                { rating.toFixed(1) }
            </span>
        </Box>
    );
}

const columns: GridColDef<Movie>[] = [
    { 
        field: "image", 
        headerName: "Постер", 
        align: 'center',
        renderCell: (params)=> (
            <img 
                src={params.value} 
                alt="Poster" 
                style={{ height: '90%', objectFit: "cover", marginTop:'5%', cursor:'pointer'  }} 
                onClick={()=> params.api.getRow(params.id).handleImageClick(params.value)}
            />
        )
    },
    { 
        field: "title", 
        headerName: "Название", 
        width: 200,
        renderCell: (params) => (
            <div style={{ 
                fontFamily: 'Arial', 
                fontSize: '14px', 
                color: '#c9fb84', 
                fontWeight: 'bold',
                wordWrap: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                { params.value }
            </div>
        )
    },
    { 
        field: "release_date", 
        headerName: "Дата выхода", 
        width: 150, 
        type: "date",
        align: 'center',
        valueGetter: (value, row)=> {
            return new Date(value);
        },
        renderCell: (params)=> {
            return (
                <div style={{ 
                    fontWeight: 'bold',
                }}>
                    { params.formattedValue }
                </div>
            );
        }
    },
    { 
        field: "rating", 
        headerName: "Рейтинг", 
        width: 150, 
        type: "number",
        align: 'center',
        renderCell: (params)=> (
            <MovieRating rating={params.value}/>
        )
    },
    { 
        field: "original_language", 
        headerName: "Язык", 
        width: 100,
        align: 'center',
        renderCell: (params)=> {
            return (
                <div style={{marginTop:'40%'}}>
                    <Flag 
                        code={params.value}
                    /> 
                </div>
            );
        }
    },
    { 
        field: "overview", 
        headerName: "Описание", 
        flex: 1,
        align: 'center',
        renderCell: (params)=> {
            return (
                <var style={{
                    color: '#252423',
                    wordWrap: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {params.value}
                </var> 
            );
        }
    }
];


export default function() {
    const { movies, loading } = useGetMovies();
    const [sortingModel, setSortingModel] = React.useState([]);
    const [filterModel, setFilterModel] = React.useState({ items: [] });
    const [selectedImage, setSelectedImage] = React.useState<string|null>(null);

    const handleImageClick =(image: string)=> {
        setSelectedImage(image);
    }
    const handleSortingModelChange =(newSortingModel)=> {
        console.log(newSortingModel);
        setSortingModel(newSortingModel);
    }

    
    return(
        <React.Fragment>
            <Dialog 
                open={Boolean(selectedImage)} 
                onClose={()=> setSelectedImage(null)}
            >
                <DialogContent>
                    { selectedImage && 
                        <img src={selectedImage} alt="Large" style={{ width: "100%" }} />
                    }
                </DialogContent>
            </Dialog>
           
            <DataGrid 
                loading={loading}
                rows={movies.map((row)=> ({ ...row, handleImageClick }))}
                columns={columns}
                //sortModel={sortingModel}
                //onSortModelChange={handleSortingModelChange}
                //filterModel={filterModel}
                //onFilterModelChange={(newFilterModel)=> setFilterModel(newFilterModel)}

                getRowHeight={(params)=> {
                    const contentHeight = params.model?.title?.length * 2;
                    return Math.max(100, Math.min((contentHeight ?? 100), 300));
                }}
                sx={{
                    "& .custom-description": { 
                        fontWeight: "bold", 
                        color: "red" 
                    },
                    "& .MuiDataGrid-cell": { 
                        minHeight: "100px", 
                        maxHeight: "300px" 
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        fontWeight: 'bold',
                    }
                }}
            />
        </React.Fragment>
    );
}