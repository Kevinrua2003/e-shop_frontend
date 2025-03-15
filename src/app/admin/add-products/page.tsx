import Container from "@/UI/container/components/Container";
import AddProductForm from "@/app/admin/add-products/AddProductForm";
import NullData from "@/UI/messages/components/NullData";
import FormContainer from "@/UI/auth/containers/FormContainer";

const AddProducts = () => {

    const currentUser = true;

    if(!currentUser){
        return (<NullData title={"There is no available data!!!"}/>);
    }

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