'use client'
import Button from '@/UI/buttons/components/Button';
import { API_URL } from '@/utils/api';
import Heading from '@/UI/Headings/components/Heading';
import CategoryInput from '@/UI/inputs/components/CategoryInput';
import Input from '@/UI/inputs/components/Input';
import { Product } from '@/UI/products/types/types';
import { categories } from '@/utils/categories';
import { resolveProductImage } from '@/utils/images';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdUpdate } from 'react-icons/md';
import Image from 'next/image';

function EditProductPage() {

    const { productId } = useParams();
    const [prod, setProd] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
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
        fetch(`${API_URL}/product/${productId}`)
            .then(response => (response.ok ? response.json() : null))
            .then(data => {
                if (data) setProd(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [productId])

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
            }

            const response = await fetch(
                `${API_URL}/product/${productId}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                }
            );

            if (response.ok) {
                toast.success("Product updated successfully");
                setIsProductUpdated(true);
                setIsLoading(false);
                router.push("/admin/manage-products")
            } else {
                toast.error(`Error updating product: ${response.statusText}`);
            }
        } catch (error) {
            setIsLoading(false);
            return toast.error(`Error updating product: ${error}`);
        }
    };

    const handleReplaceImage = async (file: File) => {
        setIsImageLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `${API_URL}/product/${productId}/image`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success("Image replaced successfully");
                setProd(p => p ? { ...p, image: `/product/${productId}/image` } : p);
            } else {
                toast.error("Error replacing image");
            }
        } catch (error) {
            toast.error(`Error replacing image: ${error}`);
        } finally {
            setIsImageLoading(false);
        }
    };

    const handleDeleteImage = async () => {
        setIsImageLoading(true);
        try {
            const response = await fetch(
                `${API_URL}/product/${productId}/image`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                toast.success("Image deleted successfully");
                setProd(p => p ? { ...p, image: null } : p);
            } else {
                toast.error("Error deleting image");
            }
        } catch (error) {
            toast.error(`Error deleting image: ${error}`);
        } finally {
            setIsImageLoading(false);
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
            <div className='text-blue-800'>
                <Heading title={"Update Product"} center />
            </div>
            <div className='text-red-400'>If you leave any field uncompleted the product will keep its original value</div>
            <Input
                id="name"
                label={`${prod?.name.substring(0, 30)}...`}
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
                label={`${prod?.brand.substring(0, 30)}...`}
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id="description"
                label={`${prod?.description.substring(0, 200)}...`}
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
                    <hr />Product Image
                </div>
                <div className="flex flex-col items-center gap-3">
                    <Image
                        src={resolveProductImage(prod?.image)}
                        alt={prod?.name ?? "product"}
                        width={140}
                        height={140}
                        className="object-contain rounded-md border border-gray-200"
                    />
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        disabled={isImageLoading || isLoading}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplaceImage(file);
                        }}
                        className="block w-full max-w-xs text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <Button
                        label={isImageLoading ? "Working..." : "Delete Image"}
                        variant="danger"
                        small
                        disabled={isImageLoading || isLoading || !prod?.image}
                        onClick={handleDeleteImage}
                    />
                </div>
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
    )
}

export default EditProductPage;
