import { Header } from "../components/Header";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Axios from '../axios.js'
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';


export default function Accessibility() {
  const [data, setData] = useState('');
  const [result, setResult] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault();
      Axios.post('/api/verify-url-accessibility',{url:data}).then(({ data }) => {
        let resultObj = {};
        resultObj['errors'] = data['accessibilityData']['categories']['error'];
        resultObj['alerts'] = data['accessibilityData']['categories']['alert'];
        setResult(resultObj)

        setResult({ ...resultObj })
    }).catch(({ response }) => {
        console.log(response.data.message)
        toast.error(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: true
        })
    })
  };

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      <>
  <Header />
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h1>Accessibility Testing</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form style={{ width: '60%' }} onSubmit={handleSubmit} id="demo">
        <FormControl>
          {/* Add a form label for context */}
          <FormLabel>Please Enter URL</FormLabel>
          <Input
            sx={{ '--Input-decoratorChildHeight': '45px' }}
            placeholder="Please Enter URL"
            type="url"
            pattern="https://.*"
            value={data}
            required
            onChange={(event) => setData(event.target.value)}
            endDecorator={
              <Button
                variant="solid"
                color="primary"
                type="submit"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                submit
              </Button>
            }
          />
        </FormControl>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h4>Results</h4>
        <div style={{ border: 'black solid 2px', width: 500, height: 400, display: 'flex', flexDirection: 'column', borderRadius: '10%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
            {/* Add alternative text for icons */}
            <WarningIcon style={{ color: 'yellow' }} aria-label="Warning Icon"></WarningIcon>
            <span><b>Warning</b></span>
            <p>{result['alerts'] && Object.entries(result['alerts']['items']).map((data) => data[1]['description'])}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Add alternative text for icons */}
            <ErrorIcon style={{ color: 'red' }} aria-label="Error Icon"></ErrorIcon>
            <span><b>Errors</b></span>
            <p>{result['errors'] && Object.entries(result['errors']['items']).map((data) => data[1]['description'])}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    </>
  )
}