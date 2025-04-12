import React, { useEffect } from 'react'
import {store} from "../../State/Store.js"
import {deleteCategory, findCategorys} from "../../State/Category/Action.js"
import {TableContainer,Card,CardHeader,Button,Table,Avatar,TableBody,TableHead, TableRow,TableCell} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
const CategorysTable = () => {
    const dispatch = useDispatch()
    const {category} = useSelector(store=>store)
    const handleProductDelete = (productId)=>{
      dispatch(deleteCategory(productId))
    }
    useEffect(()=>{
      dispatch(findCategorys())
    },[category.deleteCategory])
    console.log(category)

  ///
 
  return (
    <div className='p-5 '>
      <Card className='mt-2 p-5'>
      <CardHeader title='All Products'>
      
      </CardHeader>
      <TableContainer  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell>Ten san pham</TableCell>
    
            <TableCell>Xoa</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {category.categorys?.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
            
            <Button onClick={()=>handleProductDelete(row._id)} variant='outlined'>Xoa</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
     
    </div>
  )
}

export default CategorysTable
