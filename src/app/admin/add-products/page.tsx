import Container from "@/UI/container/components/Container";
import AddProductForm from "@/app/admin/add-products/AddProductForm";
import FormContainer from "@/UI/auth/containers/FormContainer";

const AddProducts = () => {


    return (
        <div className={""}>
            <Container>
                <FormContainer>
                    <AddProductForm/>
                </FormContainer>
            </Container>
        </div>
    );
};

export default AddProducts;