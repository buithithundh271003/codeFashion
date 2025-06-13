// import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
// import { Fragment } from 'react'
// import {Typography,Button, Grid,MenuItem, Select,TextField,InputLabel, FormControl} from '@mui/material'
import { createProduct } from '../../State/Product/Action'
 
// const CreateProductForm = () => {
//   const [product, setProductData] = useState({
//     imageUrl: "",
//     brand:"",
//     title:"",
//     danhmuc:"",
//     price:"",
//     quanity:"",
//     discount:"",
//     description:""
//   })
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   console.log(jwt)
//   const handleChange = (e)=>{
//     const {name, value} = e.target;
//     setProductData((prevData)=>({
//       ...prevData,
//       [name]:value,
//     }))
//   }

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     console.log(product)
//     dispatch(createProduct(product))
//     console.log(product)
//   }
//   return (
//     <div className='p-10'>
//       <Fragment >
//         <Typography
//         variant='h4'
//         sx={{textAlign:'center'}}
//         className='py-10 text-center'
//         >
//           Them san pham moi
//         </Typography>
//         <form
//         onSubmit={handleSubmit}
//         className='min-h-screen'
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//               fullWidth
//               label="Image URL"
//               name="imageUrl"
//               value={product.imageUrl}
//               onChange={handleChange}
//               />

               
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//               fullWidth
//               label="Brand"
//               name="brand"
//               value={product.brand}
//               onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               value={product.title}
//               onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//               fullWidth
//               label="Price"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               type='number'
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//               fullWidth
//               label="Discount"
//               name="discount"
//               value={product.discount}
//               onChange={handleChange}
//               type='number'
//               />
//             </Grid>
//             <Grid item xs={6} sm={6}>
//               <FormControl fullWidth>
//               <InputLabel>Danh muc san pham</InputLabel>
//               <Select
//               name='danhmuc'
//               value={product.danhmuc}
//               onChange={handleChange}
//               label="Danh Muc San pham"
//               >
//                 <MenuItem value="truyenngan">Truyen Ngan</MenuItem>
//                 <MenuItem value="truyendai">Truyen Dai</MenuItem>
//                 <MenuItem value="truyenthieunhi">Truyen Thieu Nhi</MenuItem>
//               </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//               fullWidth
//               label="Quanity"
//               name="quanity"
//               value={product.quanity}
//               onChange={handleChange}
//               type='number'
//               />
//               </Grid>
//             <Grid item xs={12} >
//               <TextField
//               fullWidth
//               id='outlined-multiline-static'
//               label="Description"
//               multiline
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               row={3}
               
//               />
//             </Grid>
//            <Grid item xs={12}>
//             <Button variant='contained'
//             sx={{p:1.8}}
//             className='py-20'
//             size='large'
//             type='submit'
//             >
//               Them san pham
//             </Button>
//            </Grid>
//           </Grid>
//         </form>
//       </Fragment>
//     </div>
//   )
// }

// export default CreateProductForm
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
  Upload,
  Spin,
} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hook';

import { API_BASE_URL, api } from "../../config/apiConfig";

const { Dragger } = Upload;
const { TextArea } = Input;

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setSubmittable(true),
      () => setSubmittable(false)
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
      Submit
    </Button>
  );
};

const ProductAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const categories = useAppSelector((state) => state.Category.categories);
  // const chuyenmucs = useAppSelector((state) => state.ChuyenMuc.chuyenmuc);
  const [isLoading, setIsLoading] = useState(false);

  // const optionChuyenmuc = chuyenmucs
  //   ?.filter((chm) => chm.name !== "Uncategorized")
  //   .map((chm) => ({
  //     label: chm.name,
  //     value: chm._id,
  //   }));

  // const selectOptions = categories
  //   ?.filter((cate) => cate.name !== "Uncategorized")
  //   .map((cate) => ({
  //     label: cate.name,
  //     value: cate._id,
  //   }));

  useEffect(() => {
    // dispatch(getAllChuyenMuc());
    // dispatch(getAllCategory());
  }, [dispatch]);

  const onFinish = async (values) => {
    setIsLoading(true);
    let newImages;

    if (values?.images?.file) {
      newImages = values.images.fileList.map(
        ({ response }) => response.urls[0].url
      );
    } else {
      newImages = values.images;
    }

    const newValues = { ...values, images: newImages };
    dispatch(createProduct(newValues));
    await message.success(`Add product successfully!`);
    navigate("/admin/product");
  };

  const props = {
    listType: "picture",
    name: "image",
    multiple: true,
    action: `${API_BASE_URL}/api/images`,
  };
  const sizeOptions = [
    { label: 'freesize', value: 'freesize' },
  
  ];

  const colorOptions = [
    { label: 'Đen', value: 'den' },
    { label: 'Đen - Trắng', value: 'den-trang' },
    { label: 'Đỏ', value: 'do' },
    { label: 'Hồng', value: 'hong' },
    { label: 'Kem', value: 'kem' },
    { label: 'Nâu', value: 'nau' },
    { label: 'Tím', value: 'tim' },
    { label: 'Trắng', value: 'trang' },
    { label: 'Trắng -Xanh', value: 'trang-xanh' },
    { label: 'Xám', value: 'xam' },
    { label: 'Xanh', value: 'xanh' },
  ];

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spin size="large" className="mt-16" />
        </div>
      ) : (
        <div>
          <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
            Create New Product
          </h3>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="mx-auto max-w-[500px]"
          >
            <Form.Item
              name="title"
              label="Name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: 'Please input your Author!' }]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: 'Please input your Category!' }]}
            >
              <Select placeholder="Select a category" allowClear  />
            </Form.Item>

            <Form.Item
              name="chuyenMucId"
              label="ChuyenMuc"
              rules={[{ required: true, message: 'Please input your Category!' }]}
            >
              <Select placeholder="Select a category" allowClear  />
            </Form.Item> */}

            <Space>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input your Price!' }]}
              >
                <InputNumber
                  min={0}
                  formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: 'Please input your Quantity!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="discount"
                label="discount"
                rules={[{ required: true, message: 'Please input your discount!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
       
       

            
          

            </Space>
            <Form.Item
              name="sizes"
              label="Size"
              rules={[{ required: true, message: 'Vui lòng chọn size!' }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn size"
                allowClear
                options={sizeOptions}
                style={{ width: '100%' }}
              />
            </Form.Item>
         
            {/* <Form.Item
              label="Images"
              name="images"
              rules={[{ required: true, message: 'Please input your Image!' }]}
            >
              <Dragger {...props}>
                <Button icon={<UploadOutlined />}>Choose images</Button>
              </Dragger>
            </Form.Item> */}
            <Form.Item
  label="Images"
  name="images"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  }}
  rules={[{ required: true, message: 'Please input your Image!' }]}
>
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <UploadOutlined />
    </p>
    <p className="ant-upload-text">Click or drag files to upload</p>
  </Dragger>
</Form.Item>


            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input your Description!' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <SubmitButton form={form} />
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default ProductAdd;
