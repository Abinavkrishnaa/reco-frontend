import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";

const fetchRecommendations = async () => {
  const token = localStorage.getItem("access");
  const { data } = await apiClient.get("/recommend/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const Recommendations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load recommendations</Typography>;

  return (
    <Grid container spacing={2}>
      {data?.map((content: any) => (
        <Grid item xs={12} sm={6} md={4} key={content.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{content.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {content.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Recommendations;
