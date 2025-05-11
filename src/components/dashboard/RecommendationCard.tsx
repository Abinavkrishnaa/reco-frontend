import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Favorite, Share, Bookmark } from '@mui/icons-material';

export default function RecommendationCard({ content }: { content: any }) {
  const handleLike = async () => {
    // Call API to record interaction
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {content.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.description}
        </Typography>
      </CardContent>
      <div className="flex justify-between p-2">
        <IconButton onClick={handleLike}>
          <Favorite />
        </IconButton>
        <IconButton>
          <Bookmark />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
      </div>
    </Card>
  );
}
