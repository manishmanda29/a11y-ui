
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DoneIcon from '@mui/icons-material/Done';
export default function CardTitle({title,completedTopic,...props})
{
    return(
        <Card  {...props}>
        <CardContent>
            {title}
           {completedTopic &&  <DoneIcon style={{color:'green'}}/>}
        </CardContent>

    </Card>
    )
}