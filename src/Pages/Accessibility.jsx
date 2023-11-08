import { Header } from "../components/Header";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import {useEffect, useState} from 'react'
export default function Accessibility()
{
    const [data, setData] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
        console.log(data)
        } catch (error) {
        }
      };

      useEffect(()=>{
console.log(data)
      },[data])
    return(
        <>
        <Header/>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1 >Accessibility Testing</h1>
        <form style={{width:'60%'}}onSubmit={handleSubmit} id="demo">
       <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="Please Enter URL"
          type="url"
          pattern="https://.*" 
          value={data}
          required
          onChange={(event) =>
            setData(event.target.value)
          }
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              submit
            </Button>
          }></Input>
        </FormControl>
        </form>
        </div>
        </>
    )
}