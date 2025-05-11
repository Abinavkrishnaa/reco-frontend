import { Container, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import RecommendationCard from '../components/RecommendationCard';    
import api from '../services/api';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => api.get('/recommend/').then(res => res.data),
  });

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <RecommendationCard skeleton />
            </Grid>
          ))
        ) : (
          data?.map((content: any) => (
            <Grid item xs={12} sm={6} md={4} key={content.id}>
              <RecommendationCard content={content} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
