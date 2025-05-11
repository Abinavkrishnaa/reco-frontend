import { Card, CardContent, CardActions, Typography, Button, Skeleton } from '@mui/material';
import { Favorite, Share, Bookmark } from '@mui/icons-material';

export default function RecommendationCard({ content, skeleton = false }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {skeleton ? (
          <>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h6">
              {content.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content.description}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {skeleton ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <>
            <Button size="small" startIcon={<Favorite />}>Like</Button>
            <Button size="small" startIcon={<Bookmark />}>Save</Button>
            <Button size="small" startIcon={<Share />}>Share</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
