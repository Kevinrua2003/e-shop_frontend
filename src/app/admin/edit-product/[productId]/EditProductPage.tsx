'use client'
import Button from '@/UI/buttons/components/Button';
import Heading from '@/UI/Headings/components/Heading';
import CategoryInput from '@/UI/inputs/components/CategoryInput';
import Input from '@/UI/inputs/components/Input';
import { Product } from '@/UI/products/types/types';
import { categories } from '@/utils/categories';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdUpdate } from 'react-icons/md';

function EditProductPage() {

    const {productId} = useParams();
    const [prod, setProd] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [isProductUpdated, setIsProductUpdated] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
          name: "",
          description: "",
          brand: "",
          category: "",
          image: "",
          price: 0,
        },
      });

      useEffect(() => {
          if (isProductUpdated) {
            reset();
            setIsProductUpdated(false);
          }
        }, [isProductUpdated, reset]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`).then(response => {
            setProd(response.data);
        }).catch(err => {
            console.log(err);            
        })
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {       
    
        setIsLoading(true);
        try {

          const product = {
            name: data.name ? data.name : prod?.name,
            description: data.description ? data.description : prod?.description,
            price: data.price ? Number(data.price) : prod?.price,
            brand: data.brand ? data.brand : prod?.brand,
            category: data.category ? data.category : prod?.category,
            inStock: prod?.inStock,
            image: data.image ? data.image : prod?.image,
        }
    
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
            product,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status === 200) {
            toast.success("Product updated successfully");
            setIsProductUpdated(true);
            setIsLoading(false);
            // window.location.reload();
            router.push("/admin/manage-products")
          } else {
            toast.error(`Error updating product: ${response.statusText}`);
          }
        } catch (error) {
          setIsLoading(false);
          return toast.error(`Error updating product: ${error}`);
        }
      };

    const category = watch("category");

    const setCustomValue = (id: string, value: string) => {
        setValue(id, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      };

  return (
    <>
        <>
      <div className='text-blue-800'>
        <Heading title={"Update Product"} center />
      </div>
      <div className='text-red-400'>If you leave any field uncompleted the product will keep its original value</div>
      <Input
        id="name"
        label={`${prod?.name.substring(0,30)}...`}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="price"
        label={`${prod?.price}`}
        disabled={isLoading}
        type="number"
        register={register}
        errors={errors}
      />
      <Input
        id="brand"
        label={`${prod?.brand.substring(0,30)}...`}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="description"
        label={`${prod?.description.substring(0,200)}...`}
        disabled={isLoading}
        large
        register={register}
        errors={errors}
      />

      <div className={"w-full font-medium items-center justify-center text-center"}>
        <div className={"mb-2 font-semibold text-blue-900"}><hr />Select a Category</div>
        <div className={"grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto"}>
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className='text-blue-900'>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={"w-full font-medium items-center justify-center text-center"}>
        <div className={"mb-2 font-semibold text-blue-900"}>
          <hr />Image Link Here
        </div>
        <Input
          id="image"
          label={`New Link`}
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>

      <div className={"flex items-center justify-center text-center gap-2"}>
        <hr />
        <Button
          label={isLoading ? "Loading..." : "Update"}
          icon={MdUpdate}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
    </>
  )
}

export default EditProductPage;