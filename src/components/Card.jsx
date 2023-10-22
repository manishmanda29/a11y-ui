
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
export default function CardTitle({title})
{
    return(
        <Card style={{margin:10}}>
        <CardContent>
            {title}
        </CardContent>
    </Card>
    )
}