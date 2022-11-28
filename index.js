import  express, { request }  from "express";
import * as dotenv from 'dotenv'
import { v4 as uuidv4} from 'uuid'

function formatDateToDefault(dt) {
    const newDt = new Date(dt);
    return `${newDt.getFullYear()}-${
      newDt.getMonth() + 1 < 10
        ? `0${newDt.getMonth() + 1}`
        : newDt.getMonth() + 1
    }-${newDt.getDate() < 10 ? `0${newDt.getDate()}` : newDt.getDate()}`;
  }
dotenv.config()
const app = express()
app.use(express.json())

const data=[]

app.get('/',(request,response)=>{     
    return response.status(200).json(data)})

    app.post(('/new'), (request,response)=>{
const newData={...request.body,id:uuidv4(), initDate:formatDateToDefault(new Date(Date.now()))}
data.push(newData)
return response.status(201).json(data)
})

app.put('/change/:id',(request,response)=>{
const { id } = request.params;
const index = data.findIndex((el)=>el.id===id);
data[index]={...data[index],
...request.body}
return response.status(200).json(data[index])
});

app.delete('/delete/:id',(request,response)=>
{
    const { id } = request.params;
let index = data.findIndex((el)=>el.id===id);
data.splice(index,1)
return response.status(200).json(data)
})


app.listen(Number(process.env.PORT), ()=>console.log(`Server started at port ${process.env.PORT}`))

