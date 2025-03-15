import React from 'react'
import {ListRatingProps} from "@/UI/products/types/types";
import Heading from "@/UI/Headings/components/Heading";
import {Avatar, Rating} from "@mui/material";

const ListRating : React.FC<ListRatingProps> = ( { product } : ListRatingProps ) => {
    return (
        <div>
            <Heading title = { "Product Review" }/>
            <div className = { "text-sm mt-2" }>
                { product.data.reviews && product.data.reviews.map(( review ) => {
                    return (
                        <div key = { review.id } className = { `max-w-[300px]` }>
                            <div className = { "flex gap-2 items-start" }>
                                < Avatar src = { review.user.image } alt = { review.user.name }/>
                                <p className = { "font-semibold" }>{ review?.user.name }</p>
                            </div>
                            <div className = { "mt-2" }>
                                <Rating value = { review.rating } readOnly/>
                                <p className = { "ml-2" }>{ review.comment }</p>
                                <hr className = { "mt-4  mb-4" }/>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
export default ListRating
