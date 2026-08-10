'use client';

import Heading from "@/UI/Headings/components/Heading";
import { API_URL } from "@/utils/api";
import Input from "@/UI/inputs/components/Input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomCheckBox from "@/UI/inputs/components/CustomCheckBox";
import { categories } from "@/utils/categories";
import CategoryInput from "@/UI/inputs/components/CategoryInput";
import Button from "@/UI/buttons/components/Button";
import { AiFillFileAdd } from "react-icons/ai";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      price: 0,
    },
  });

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setSelectedFile(null);
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

      // 1) Crear el producto (la imagen se gestiona por separado).
      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setIsLoading(false);
        return toast.error("Error creating product");
      }

      // 2) Subir la imagen si se eligió un archivo.
      const created = await response.json();
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const imageResponse = await fetch(
          `${API_URL}/product/${created.id}/image`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          setIsLoading(false);
          return toast.error("Product created, but image upload failed");
        }
      }

      setIsLoading(false);
      toast.success("Product created successfully");
      setIsProductCreated(true);
      router.refresh();
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
                      onClick={(category) =>
                        setCustomValue("category", category)
                      }
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
              <hr />Product Image
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              disabled={isLoading}
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] ?? null)
              }
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {selectedFile && (
              <div className="mt-3">
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  width={120}
                  height={120}
                  className="object-contain mx-auto rounded-md border border-gray-200"
                />
              </div>
            )}
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
