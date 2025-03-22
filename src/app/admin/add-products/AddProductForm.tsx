'use client';

import Heading from "@/UI/Headings/components/Heading";
import Input from "@/UI/inputs/components/Input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomCheckBox from "@/UI/inputs/components/CustomCheckBox";
import { categories } from "@/utils/categories";
import CategoryInput from "@/UI/inputs/components/CategoryInput";
import Button from "@/UI/buttons/components/Button";
import { AiFillFileAdd } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);

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
      inStock: false,
      image: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Asegurarse de que el precio sea un número
    data.price = Number(data.price);

    setIsLoading(true);
    try {
      if (!data.category) {
        setIsLoading(false);
        return toast.error("Must select a category");
      }

      if (!data.image) {
        setIsLoading(false);
        return toast.error("Product must have an image link");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product created successfully");
        setIsProductCreated(true);
        window.location.reload();
      } else {
        toast.error("Error creating product");
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(`Error creating product: ${error}`);
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
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <Heading title={"Add Product"} center />
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label={"Name"}
            disabled={isLoading}
            required
            register={register}
            errors={errors}
          />
          <Input
            id="price"
            label={"Price"}
            disabled={isLoading}
            type="number"
            required
            register={register}
            errors={errors}
        />
          <Input
            id="brand"
            label={"Brand"}
            disabled={isLoading}
            required
            register={register}
            errors={errors}
        />
          <Input
            id="description"
            label={"Description"}
            disabled={isLoading}
            required
            large
            register={register}
            errors={errors}
          />
          <CustomCheckBox
            id={"inStock"}
            label={"Product in Stock"}
            register={register}
          />
          <div className="w-full font-medium items-center justify-center text-center">
            <div className="mb-2 font-semibold text-blue-900">
              <hr />Select a Category
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
              {categories.map((item) => {
                if (item.label === "All") return null;
                return (
                  <div key={item.label} className="text-blue-900">
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
          <div className="w-full font-medium items-center justify-center text-center">
            <div className="mb-2 font-semibold text-blue-900">
              <hr />Image Link Here
            </div>
            <Input
              id="image"
              label={"Link"}
              disabled={isLoading}
              required
              register={register}
              errors={errors}
              />
          </div>
          <div className="flex items-center justify-center text-center gap-2">
            <hr />
            <Button
              label={isLoading ? "Loading..." : "Add Product"}
              icon={AiFillFileAdd}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductForm;
