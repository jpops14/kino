import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getNews } from "../_lib/news/actions";

const NewsList = async ({ limit }: { limit?: number }) => {

    const displayedNews = await getNews(limit) || [];

    return (
        <Grid container spacing={2} p={2}>
            {displayedNews.map((newsItem) => (
                <Grid item xs={12} key={newsItem.id}>
                    <Card sx={{ borderRadius: 2, overflow: 'hidden', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' }, boxShadow: 3 }}>
                        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography fontWeight="bold" variant="h4" color="primary">{newsItem.title}</Typography>
                            <Typography fontWeight="medium" variant="h6" color="textSecondary">{newsItem.subtitle}</Typography>
                            <Typography fontWeight="medium" variant="body1" color="textSecondary">{newsItem.content}</Typography>
                            <Typography fontWeight="medium" variant="body2" color="textSecondary">{new Date(newsItem.publication).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsList;